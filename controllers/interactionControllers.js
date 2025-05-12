const express = require('express');
const Interaction = require('../models/interactionModel');

// Funzione per ottenere tutte le interazioni
const getAllInteractions = async (req, res) => {
    try {
        const interactions = await Interaction.find({});                          
        if (interactions.length === 0) {
            return res.status(404).send('Nessuna interazione trovata');
        }
        res.status(200).json(interactions);
    } catch (error) {
        res.status(500).send('Errore interno del server');
    }
}
// Funzione per ottenere un'interazione per ID
const getInteractionById = async (req, res) => {
    try {
        const interactionId = req.params.id
        const interaction = await Interaction.findById(interactionId)
        if (!interaction) {
            return res.status(404).send('Interazione non trovata');
        }   
        res.status(200).json(interaction);
    }catch (error) {
        res.status(500).send('Errore interno del server')
    }
}

const getInteractionsByCity = async (req, res) => {
    try {
        const city = req.params.city; // La città viene passata come parametro URL
        if (!city) {
            return res.status(400).send('Città non fornita');
        }

        const interactions = await Interaction.find({})
            .populate({
                path: 'userId', 
                match: { city: city } 
            })
            .exec();

        const filteredInteractions = interactions.filter(interaction => interaction.userId !== null);

        if (filteredInteractions.length === 0) {
            return res.status(404).send('Nessuna interazione trovata per la città specificata');
        }

        res.status(200).json(filteredInteractions);
    } catch (error) {
        console.error('Errore durante la ricerca delle interazioni per città:', error);
        res.status(500).send('Errore interno del server');
    }
};

// Funzione per ottenere interazioni in base alla data
const getInteractionsByDate = async (req, res) => {
    try {
        const date = req.query.date; // La data viene passata come query string
        if (!date) {
            return res.status(400).send('Data non fornita');
        }

        // Converte la data in un range per cercare tutte le interazioni di quel giorno
        const startOfDay = new Date(date); 
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        const interactions = await Interaction.find({
            createdAt: { $gte: startOfDay, $lte: endOfDay }
        });

        if (interactions.length === 0) {
            return res.status(404).send('Nessuna interazione trovata per la data specificata');
        }

        res.status(200).json(interactions);
    } catch (error) {
        console.error('Errore durante la ricerca delle interazioni per data:', error);
        res.status(500).send('Errore interno del server');
    }
};

// Funzione per creare una nuova interazione
const createInteraction = async (req, res) => {
    try {
        const { postId, userId, type, text } = req.body;

        if (!['comment', 'like', 'dislike'].includes(type)) {
            return res.status(400).send('Tipo di interazione non valido');
        }

       
        if (type === 'comment' && (!text || text.trim() === '')) {
            return res.status(400).send('Il testo è obbligatorio per i commenti');
        }

       
        const newInteraction = new Interaction({
            postId,
            userId,
            type,
            ...(type === 'comment' && { text }) 
        });

        await newInteraction.save();
        res.status(201).json(newInteraction);
    } catch (error) {
        console.error('Errore durante la creazione dell\'interazione:', error);
        res.status(500).send('Errore interno del server');
    }
};
//  Funzione per aggiornare un'interazione
const updateInteraction = async (req, res) => {
    try {
        const interactionId = req.params.id
        if (!interactionId) {
            return res.status(400).send('ID dell\'interazione non fornito');
        }else if (!req.body) {
            return res.status(400).send('Dati dell\'interazione non forniti');
        }else if (mongoose.Types.ObjectId.isValid(interactionId) === false) {
            return res.status(400).send('ID dell\'interazione non valido');
        }
        const updatedInteraction = await Interaction.findByIdAndUpdate(interactionId, req.body, { new: true });
        if (!updatedInteraction) {
            return res.status(404).send('Interazione non trovata');
        }
        res.status(200).json(updatedInteraction);
    }catch (error) {
        res.status(500).send('Errore interno del server')
    }
}

// Funzione per eliminare un'interazione
const deleteInteraction = async (req, res) => {
    try {
        const interactionId = req.params.id
        if (!interactionId) {
            return res.status(400).send('ID dell\'interazione non fornito');
        }else if (mongoose.Types.ObjectId.isValid(interactionId) === false) {
            return res.status(400).send('ID dell\'interazione non valido');
        }
        const deletedInteraction = await Interaction.findByIdAndDelete(interactionId);
        if (!deletedInteraction) {
            return res.status(404).send('Interazione non trovata');
        }
        res.status(200).json(deletedInteraction);
    }catch (error) {
        res.status(500).send('Errore interno del server')
    }
}

module.exports = {
    getAllInteractions,
    getInteractionById,
    createInteraction,
    updateInteraction,
    deleteInteraction,
    getInteractionsByCity,
    getInteractionsByDate
}
