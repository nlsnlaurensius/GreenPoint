const express = require('express');
const router = express.Router();
const bankSampahController = require('../controllers/bankSampahs.controller');
const authenticateToken = require('../middleware/auth.middleware');
const checkAdmin = require('../middleware/admin.middleware');

router.get('/', bankSampahController.getAllBankSampahs);
router.get('/:id', bankSampahController.getBankSampahById);

router.post('/', authenticateToken, checkAdmin, bankSampahController.createBankSampah);
router.put('/:id', authenticateToken, checkAdmin, bankSampahController.updateBankSampah);
router.delete('/:id', authenticateToken, checkAdmin, bankSampahController.deleteBankSampah);

module.exports = router;