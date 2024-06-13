const {getCollection} = require("../models/document");

const insertOne = async (req, res) => {
  try {
    const collection = await getCollection();
    let {name, description, type} = req.body;
    const result = await collection.insertOne({name, description, type});

    console.log("Document inserted with ID:", result.insertedId);
    res.redirect('/');
  } catch (error) {
    console.log(error);
  }
}

const getDocumentWithCursor = async (req, res) => {
  try {
    const collection = await getCollection();
    const cursor = collection.find();
    let documents = [];
    await cursor.forEach(doc => documents.push(doc));

    res.render('documents', {documents});
  } catch (error) {
    console.log(error);
  }
}

const getStatistic = async (req, res) => {
  try {
    const collection = await getCollection();
    const aggregationPipeLine = [
      {
        $group: {
          _id: null,
          uniqueNames: {$addToSet: "$name"},
          count: {$sum: 1},
          type: {$first: "$type"}
        }
      }
    ]
    const result = await collection.aggregate(aggregationPipeLine).toArray();
    const statistics = result[0];

    res.render('statistic', {statistics});
  } catch (error) {
    console.log(error)
    res.status(500).json({message: 'Internal server error'});
  }
}

module.exports = {
  getDocumentWithCursor,
  insertOne,
  getStatistic
};