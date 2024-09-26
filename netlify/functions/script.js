const { GoogleGenerativeAI } = require("@google/generative-ai");

const owner = 'william-ong1';
const repo = 'insight-archives';
const path = 'data/data.json';
const branch = 'auto-updated-quotes';

let newQuote = {
  "date": new Date().toISOString().split('T')[0],
  "quote": "",
  "author": ""
};

exports.handler = async (event, context) => {
  await generateQuote();
  await updateQuoteFile();
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Updated quotes"}),
  };
};

async function generateQuote() {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = "Provide a quote in the format of Quote: [quote] Author: [author]";
    const result = await model.generateContent(prompt);

    const response = result.response.text();
    const regex = /Quote:\s*"([^"]*)"\s*Author:\s*(.*)/;
    const match = response.match(regex);
    
    newQuote.quote = match[1].trim();
    newQuote.author = match[2].trim();
  } catch (error) {
    console.error("Error retrieving quote: ", error);
  }
}

async function updateQuoteFile() {
  try {
    const { Octokit } = await import("@octokit/rest");

    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,
    });

    const { data: existingFile } = await octokit.repos.getContent({
      owner,
      repo,
      path,
      ref: branch
    });

    const existingContent = Buffer.from(existingFile.content, 'base64').toString('utf-8');
    const quotesArray = JSON.parse(existingContent);
    quotesArray.push(newQuote);
    const updatedContent = JSON.stringify(quotesArray, null, 2);

    const response = await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message: 'Append new quote to file!!',
      content: Buffer.from(updatedContent).toString('base64'),
      sha: existingFile.sha,
      branch: branch
    });
    console.log('File updated successfully:', response.data);
  } catch (error) {
    console.error('Error updating file: ', error);
  }
}
