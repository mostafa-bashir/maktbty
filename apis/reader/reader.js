const express = require('express');
const router = express.Router();

const signup = require('./auth/signup');
router.use('/signup', signup);

const login = require('./auth/login');
router.use('/login', login);

const logout = require('./auth/logout');
router.use('/logout', logout);

const books = require('./books/books');
router.use('/books', books);

const reviews = require('./books/reviews');
router.use('/reviews', reviews);

const oldBooks = require('./books/oldBooks');
router.use('/old-books', oldBooks);

module.exports = router;