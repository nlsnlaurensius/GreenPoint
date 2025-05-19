const express = require('express');
const router = express.Router();
const rewardsController = require('../controllers/rewards.controller');
const authenticateToken = require('../middleware/auth.middleware');
const checkAdmin = require('../middleware/admin.middleware');

router.get('/', rewardsController.getAllRewards);
router.get('/:id', rewardsController.getRewardById);

router.post('/', authenticateToken, checkAdmin, rewardsController.createReward);
router.put('/:id', authenticateToken, checkAdmin, rewardsController.updateReward);
router.delete('/:id', authenticateToken, checkAdmin, rewardsController.deleteReward);

module.exports = router;