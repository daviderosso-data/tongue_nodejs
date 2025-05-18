const express = require('express')
const router = express.Router()

const { getAllInteractions, createInteraction, updateInteraction, deleteInteraction} = require('../controllers/interactionControllers');

router.get('/', getAllInteractions);
router.post('/', createInteraction);
router.put('/', updateInteraction);
router.delete('/:id', deleteInteraction);

module.exports = router
