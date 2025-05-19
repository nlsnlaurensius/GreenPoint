const express = require('express');
const router = express.Router();
const rewardRedemptionController = require('../controllers/rewardRedemptions.controller');
const authenticateToken = require('../middleware/auth.middleware');
const checkAdmin = require('../middleware/admin.middleware');

router.post('/', authenticateToken, rewardRedemptionController.redeemReward);

router.get('/user/:userId', authenticateToken, rewardRedemptionController.getRewardRedemptionsByUserId);

router.get('/', authenticateToken, checkAdmin, rewardRedemptionController.getAllRewardRedemptions);

module.exports = router;