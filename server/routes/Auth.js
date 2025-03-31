const express = require('express');
const router = express.Router();
const authController = require('../controllers/Auth');
const { verifyToken } = require('../middleware/VerifyToken');

router.post('/signup', authController.signup).post('/login', authController.login).get('/check-auth', verifyToken, authController.checkAuth).post('/logout', authController.logout);
// .post("/verify-otp",authController.verifyOtp)
// .post("/resend-otp",authController.resendOtp)
// .post("/forgot-password",authController.forgotPassword)
// .post("/reset-password",authController.resetPassword)

module.exports = router;
