const express = require('express');
const router = express.Router();
const { 
  send_email_forgot_password, 
  validate_reset_token, 
  reset_password 
} = require('../controllers/forgot_password');

router.post('/api/v1/forgot_password', send_email_forgot_password);
router.get('/api/v1/validate-reset-token', validate_reset_token);
router.post('/api/v1/reset-password', reset_password);

module.exports = router;