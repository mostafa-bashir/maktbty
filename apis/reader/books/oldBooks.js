const express = require('express');
const router = express.Router();

const {getReadBooksController} = require('../../../controllers/reader/books/reviewsController');

router.get('/', getReadBooksController);

module.exports = router