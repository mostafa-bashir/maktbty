const express = require('express');
const router = express.Router();

const allBooksController = require('../../../controllers/admin/books/allBookscontroller');

router.get('/', allBooksController);

module.exports = router;