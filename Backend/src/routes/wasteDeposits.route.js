const express = require('express');
const router = express.Router();
const wasteDepositController = require('../controllers/wasteDeposits.controller');
const checkAdmin = require('../middleware/admin.middleware');

router.get('/', checkAdmin, wasteDepositController.getAllWasteDeposits);

router.post('/', wasteDepositController.createWasteDeposit);

router.get('/:id', wasteDepositController.getWasteDepositById);

router.get('/user/:userId', wasteDepositController.getWasteDepositsByUserId);

router.delete('/:id', checkAdmin, wasteDepositController.deleteWasteDeposit);

module.exports = router;