const express = require('express');
const router = express.Router();

const multer = require('../../../services/multer');
const upload = multer('public/images');

const {getEditBookController, postEditBookController} = require('../../../controllers/admin/books/editBookController');

router
    .get('/:id', getEditBookController)
    .post('/:id', upload.any('bookImages'), postEditBookController);

module.exports = router;