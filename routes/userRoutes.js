const express = require('express');
const { get } = require('mongoose');
const router = express.Router()
const { getAllUsers, createUser, updateUser, deleteUser } = require('../controllers/userControllers')

router.get('/', getAllUsers);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router
