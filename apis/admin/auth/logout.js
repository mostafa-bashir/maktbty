const express = require('express');
const router = express.Router();

const {getLogoutController} = require('../../../controllers/admin/auth/loginController');

router.get('/', getLogoutController);

module.exports = router;

