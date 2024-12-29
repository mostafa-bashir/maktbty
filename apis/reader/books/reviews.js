const express = require('express');
const router = express.Router();

const {getMyReviewsController, postReviewController} = require('../../../controllers/reader/books/reviewsController');

router
    .get('/', getMyReviewsController)
    .post('/:bookId/:rentId', postReviewController);

module.exports = router;