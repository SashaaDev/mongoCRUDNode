const express = require('express');
const {getDocumentWithCursor, insertOne, getStatistic} = require('../controllers/documentController');
const router = express.Router();

router.get('/', getDocumentWithCursor);
router.post('/insertOne', insertOne);
router.get('/statistic', getStatistic);
module.exports = router