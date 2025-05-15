const waste_depositController = require('../controllers/waste_deposit.controller');
const express = require('express');
const router = express.Router();

router.get('/', waste_depositController.getAllWasteDeposits);
router.get('/:id', waste_depositController.getWasteDepositById);
router.post('/', waste_depositController.createWasteDeposit);
router.get('/user/:userId', waste_depositController.getWasteDepositsByUserId);
router.delete('/:id', waste_depositController.deleteWasteDeposit);

module.exports = router;