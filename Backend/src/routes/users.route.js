const userController = require('../controllers/users.controller');
const express = require('express');
const router = express.Router();

router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.get('/:id', userController.getUserById);
router.post('/login', userController.findUserByEmailpassword);
router.get('/email/:email', userController.findUserByEmail);
router.put('/:id', userController.updateUser);

module.exports = router;