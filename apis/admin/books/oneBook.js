const express = require('express');
const router = express.Router();

const oneBookController = require('../../../controllers/admin/books/oneBookController');

router.get('/:id', oneBookController);

module.exports = router;