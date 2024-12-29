const express = require('express');
const router = express.Router();

const deleteController = require('../../../controllers/admin/books/deleteController');

router.post('/:id', deleteController);

module.exports = router;