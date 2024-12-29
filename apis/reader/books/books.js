const express = require('express');
const router = express.Router();

const {getBooksController, getRentBookController, postRentBookController} = require('../../../controllers/reader/books/booksController');

router
    .get('/', getBooksController)
    .get('/:id/rent', getRentBookController)
    .post('/:id/rent', postRentBookController);



module.exports = router;