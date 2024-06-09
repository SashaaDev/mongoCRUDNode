const { MongoClient } = require('mongodb');
const uri = process.env.MONGO_URI;

let client;
let db;
const connectDB = async () => {
  try {
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    db = client.db(process.env.DB_NAME);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(err);
  }
  return db;
};
const getDb = () => db;
module.exports = { connectDB, getDb }
