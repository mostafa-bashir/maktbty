const express = require('express');
const router = express.Router()



const {getSignupController, postSignupController} = require('../../../controllers/reader/auth/signupController');

router.get('/', getSignupController);
router.post('/', (req,res) => postSignupController(req,res,'reader'));


module.exports = router;