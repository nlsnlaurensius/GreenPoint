const express = require('express');
const router = express.Router();
const depositCodeController = require('../controllers/depositCode.controller');
const authenticateToken = require('../middleware/auth.middleware');
const checkAdmin = require('../middleware/admin.middleware');

router.post('/generate', authenticateToken, checkAdmin, depositCodeController.generateDepositCode);
router.get('/active', authenticateToken, checkAdmin, depositCodeController.getActiveDepositCode);
router.post('/validate', authenticateToken, depositCodeController.validateDepositCode);

module.exports = router;
