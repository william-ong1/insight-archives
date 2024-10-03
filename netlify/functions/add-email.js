const { MongoClient } = require("mongodb");

exports.handler = async (event, context) => {
  const email = event.queryStringParameters.email;
  await addToMailingList(email);

  return {
    statusCode: 200,
    body: JSON.stringify("Added email"),
  };
}

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

const addToMailingList = async (email) => {
  try {
    await client.connect();

    const db = client.db("mailing-list");
    const coll = db.collection("emails");

    await coll.insertOne({email: email})
  } finally {
    await client.close();
  }
}
