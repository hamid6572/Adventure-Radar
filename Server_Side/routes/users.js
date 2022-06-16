const express = require('express');
const router = express.Router();
const usersController = require('../controller/users');

router.get('/getAllUsers', usersController.getUsers);
router.get('/deleteuser/:id', usersController.deleteUser);
router.post('/updateuser/:id', usersController.updateUser);

module.exports = router;
