const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

router.post('/login', userController.loginUser);
router.post('/verify-otp', userController.verifyOTP);
router.post('/signUp', userController.signup);
router.patch('/afterSignUp/:emailId', userController.updateUserAfterSignup);
router.patch('/risk/:emailId', userController.risk);
// router.get('/:badgeID', userController.getUserByBadgeID);
// router.get('/profile/:badgeID', userController.getProfileOfUserByBadgeID);

module.exports = router;