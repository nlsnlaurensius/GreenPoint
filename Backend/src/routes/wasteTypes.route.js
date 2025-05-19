const express = require('express');
const router = express.Router();
const wasteTypesController = require('../controllers/wasteTypes.controller');

router.get('/', wasteTypesController.getAllWasteTypes);
router.get('/:id', wasteTypesController.getWasteTypeById);

module.exports = router;