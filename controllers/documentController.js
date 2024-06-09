const {getCollection} = require("../models/document");

const getAll = async (req, res) => {
  try {
    const collection = await getCollection();
    const result = await collection.find().toArray();
    res.render('documents', {documents: result});
  } catch (error) {
    console.log(error);
  }
}
const insertOne = async (req, res) => {
  try {
    const collection = await getCollection();
    const result = await collection.insertOne(req.body);
    console.log("Document inserted with ID:", result.insertedId);
    res.redirect('/');
  } catch (error) {
    console.log(error);
  }
}

const insertMany = async (req, res) => {
  try {
    const array = req.body.documents
    console.log(array)
    const collection = await getCollection();
    const result = await collection.insertMany(array);
    console.log("Documents inserted with ID:", result.insertedIds);
    res.redirect('/');
  } catch (error) {
    console.log(error);
    res.status(500).send('Error adding user');
  }
}

const updateOne = async (req, res) => {
  try {
    const collection = await getCollection();
    const {
      currentName, newName, newDescription
    } = req.body;
    if (currentName === newName) {
      return res.status(400).send('New name cannot be the same as the current name');
    }
    const result = await collection.updateOne({name: currentName}, {
      $set: {
        name: newName || 'default', description: newDescription || ''
      }
    });
    if (result.modifiedCount === 0) {
      return res.status(404).send('Document not found');
    }

    console.log("Updated documents:", result.modifiedCount);
    res.redirect('/')
  } catch (error) {
    console.log(error);
    res.status(500).send('Error updating user');
  }
}
const updateMany = async (req, res) => {
  try {
    const collection = await getCollection();
    const {currentName, newName, newDescription} = req.body;
    if (currentName === newName) {
      return res.status(400).send('New name cannot be the same as the current name');
    }
    const result = await collection.updateMany({name: currentName}, {
      $set: {
        name: newName || 'default',
        description: newDescription || ''
      }
    });
    if (result.modifiedCount === 0) {
      res.status(404).send('Document not found');
    }
    console.log("Updated documents:", result.modifiedCount);
    res.redirect('/')
  } catch (err) {
    res.status(500).json({error: err.message});
  }
};

const replaceOne = async (req, res) => {
  try {
    const collection = await getCollection();
    const {currentName, newName, newDescription} = req.body;

    if (currentName === newName) {
      return res.status(400).send('New name cannot be the same as the current name');
    }

    const newDocument = {
      name: newName || 'default',
      description: newDescription || ''
    };

    const result = await collection.replaceOne({name: currentName}, newDocument);

    if (result.modifiedCount === 0) {
      res.status(404).send('Document not found');
    }
    console.log("Document was replaced with name:", newName || 'default');
    res.redirect('/');
  } catch (err) {
    res.status(500).json({error: err.message});
  }
};

const deleteOne = async (req, res) => {
  try {
    const collection = await getCollection();
    const { name } = req.body; // використання req.body для доступу до даних форми

    if (!name) {
      return res.status(400).send('Name is required');
    }

    const result = await collection.deleteOne({ name });

    if (result.deletedCount === 0) {
      return res.status(404).send('Document not found');
    }

    console.log("Deleted document with name:", name);
    res.redirect('/');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteMany = async (req, res) => {
  try {
    const collection = await getCollection();
    let { names } = req.body;

    names = names.split(',').map(name => name.trim());

    const result = await collection.deleteMany({ name: { $in: names } });
    if (result.deletedCount === 0) {
      res.status(404).send('Document not found');
    }
    console.log("Deleted documents with names:", names);
    res.redirect('/');
  } catch (err) {
    res.status(500).json({error: err.message});
  }
};

const find = async (req, res) => {
  try {
    const collection = await getCollection();
    let { names } = req.body;

    names = names.split(',').map(name => name.trim());

    const result = await collection.find({ name: { $in: names } }).toArray();

    if (result.length === 0) {
      return res.status(404).send('Documents not found');
    }

    console.log("Found documents:", result);

    const allDocuments = await collection.find().toArray();

    res.render('documents', { documents: allDocuments, foundDocuments: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAll,
  insertOne,
  insertMany,
  updateOne,
  updateMany,
  replaceOne,
  deleteOne,
  deleteMany,
  find,
};