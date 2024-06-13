const {getDb} = require('../config/config');

const collection = 'docs';

const getCollection = async () => {
  const db = await getDb();
  return db.collection(collection)
}

module.exports = {
  getCollection
}