const rewardsReprository = require("../controllers/rewards.controller");
const express = require('express');
const router = express.Router();

router.get('/', rewardsReprository.getAllRewards);
router.get('/:id', rewardsReprository.getRewardById);
router.post('/', rewardsReprository.createReward);
router.put('/:id', rewardsReprository.updateReward);
router.delete('/:id', rewardsReprository.deleteReward);

module.exports = router;