const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller');
const authenticateToken = require('../middleware/auth.middleware');
const checkAdmin = require('../middleware/admin.middleware');

router.get('/', checkAdmin, userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.get('/email/:email', checkAdmin, userController.findUserByEmail);
router.put('/:id', userController.updateUser);
router.delete('/:id', checkAdmin, userController.deleteUser);

module.exports = router;