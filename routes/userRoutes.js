const express = require('express');
const { get } = require('mongoose');
const router = express.Router()
const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/userControllers')

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router
