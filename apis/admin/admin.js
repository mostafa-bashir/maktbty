const express = require('express');
const router = express.Router();

const signup = require('./auth/signup');
router.use('/signup', signup);

const login = require('./auth/login');
router.use('/login', login);

const logout = require('./auth/logout');
router.use('/logout', logout);

const allBooks = require('./books/allBooks');
router.use('/allbooks', allBooks);

const addbook = require('./books/addBook');
router.use('/addbook', addbook);

const oneBook = require('./books/oneBook');
router.use('/book', oneBook);

const deleteBook = require('./books/deleteBook');
router.use('/delete', deleteBook);

const editBook = require('./books/editBook');
router.use('/edit', editBook);

module.exports = router;