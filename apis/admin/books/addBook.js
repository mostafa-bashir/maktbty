const express = require('express');
const router = express.Router();

const multer = require('../../../services/multer');
const upload = multer('public/images');

const {getAddBookController,postAddBookController} = require('../../../controllers/admin/books/addBookController');

router.get('/', getAddBookController);
router.post('/', upload.any('bookImages'),postAddBookController);

module.exports = router;