const express = require('express');
const {getAll, insertOne, insertMany, updateOne, updateMany, replaceOne, deleteOne, deleteMany, find} = require('../controllers/documentController');
const router = express.Router();

router.get('/', getAll);
router.post('/insertOne', insertOne);
router.post('/insertMany', insertMany);
router.post('/updateOne', updateOne);
router.post('/updateMany', updateMany);
router.post('/replaceOne', replaceOne);
router.post('/deleteOne', deleteOne);
router.post('/deleteMany', deleteMany);
router.post('/find', find);

module.exports = router