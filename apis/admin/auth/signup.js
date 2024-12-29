const express = require('express');
const router = express.Router()



const {getSignupController, postSignupController} = require('../../../controllers/admin/auth/signupController');

router.get('/', getSignupController);
router.post('/', (req,res) => postSignupController(req,res,'librarian'));


module.exports = router;