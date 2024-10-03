/* 
Script that uses the Gemini API to retrieve a quote and its author, then adds it to the static file of quotes in the GitHub repo.
Script also sends the new quote to subscribed users.
Netlify automatically deploys the updated repo, allowing the site to display the most updated content.
Script is called at midnight PST through Netlify's serverless functions and cron jobs.
*/

// require('dotenv').config()

const { GoogleGenerativeAI } = require("@google/generative-ai");
const { MongoClient } = require("mongodb");
const sgMail = require('@sendgrid/mail')

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

let emails = [];

// Script that is called. Requires a special key during the function call to update the quotes, limiting authorized users. 
exports.handler = async (event, context) => {
  const key = event.path.split('/').pop()
  if (key === process.env.ACCESS_KEY) {
    await generateQuote();
    await updateQuoteFile();
    await getEmails();
    await sendEmails();

    return {
      statusCode: 200,
      body: JSON.stringify("Successfully updated quote and emailed mailing list"),
    };
  }

  return {
    statusCode: 500,
    body: JSON.stringify("Incorrect key"),
  };
};

// Information to access GitHub file.
const owner = 'william-ong1';
const repo = 'insight-archives';
const path = 'data/quotes.json';
const branch = 'auto-updated-quotes';

// Stores the new quote's information.
let newQuote = {
  "date": new Date().toISOString().split('T')[0],
  "quote": "",
  "author": ""
};

// Uses Gemini API to retrieve a quote.
async function generateQuote() {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = "Provide a new quote in the format of Quote: [quote] Author: [author]";
    const result = await model.generateContent(prompt);

    // Parses the response and stores the quote and author.
    const response = result.response.text();
    const regex = /Quote:\s*"([^"]*)"\s*Author:\s*(.*)/;
    const match = response.match(regex);
    
    newQuote.quote = match[1].trim();
    newQuote.author = match[2].trim();
  } catch (error) {
    console.error("Error retrieving quote: ", error);
  }
}

// Uses Octokit to update the static quote file on GitHub.
async function updateQuoteFile() {
  try {
    const { Octokit } = await import("@octokit/rest");

    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,
    });

    // Retrieves the current content in the file and parses it into a quote array.
    const { data: existingFile } = await octokit.repos.getContent({
      owner,
      repo,
      path,
      ref: branch
    });
    const existingContent = Buffer.from(existingFile.content, 'base64').toString('utf-8');
    const quotesArray = JSON.parse(existingContent);

    // Adds the new quote to the array and converts it to a string.
    quotesArray.push(newQuote);
    const updatedContent = JSON.stringify(quotesArray, null, 2);

    // Pushes the file update to the repo.
    const response = await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message: 'Updated daily quote',
      content: Buffer.from(updatedContent).toString('base64'),
      sha: existingFile.sha,
      branch: branch
    });
    console.log('File updated successfully:', response.data);
  } catch (error) {
    console.error('Error updating file: ', error);
  }
}

// Retrieves the mailing list stored in MongoDB.
async function getEmails() {
  try {
    await client.connect();

    const db = client.db("mailing-list");
    const coll = db.collection("emails");

    const docs = await coll.find().toArray()

    for (entry of docs) {
      emails.push(entry.email);
    }
  } finally {
    await client.close();
  }
}

// Sends the new quote using SendGrid API.
async function sendEmails() {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: emails,
    from: 'insightarchivesquote@gmail.com',
    subject: 'Quote Quest: Discover Today’s Insight!',
    text: `Today's insight: \"${newQuote.quote}\" - ${newQuote.author}`,
    html: `Today's insight: \"${newQuote.quote}\" - ${newQuote.author}`,
  }
  sgMail.send(msg);
}