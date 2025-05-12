const express = require('express')
const router = express.Router()

const { getAllInteractions, getInteractionById, createInteraction, updateInteraction, deleteInteraction, getInteractionsByCity, getInteractionsByDate} = require('../controllers/interactionControllers');

router.get('/', getAllInteractions);
router.get('/:id', getInteractionById);
router.post('/', createInteraction);
router.put('/:id', updateInteraction);
router.delete('/:id', deleteInteraction);
router.get('/city/:city', getInteractionsByCity); 
router.get('/date', getInteractionsByDate); 

module.exports = router
