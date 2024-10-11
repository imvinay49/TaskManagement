const express = require('express');
const router = express.Router();
const { signup,login } = require('../controllers/Auth');
const { requestPasswordReset } = require('../controllers/RequestPassword');
const { resetPassword } = require('../controllers/ResetPassword');

router.post('/signup',signup);
router.post('/login',login);
router.post('/requestPasswordReset',requestPasswordReset)
router.post('/resetPassword/:id',resetPassword);

module.exports = router;