const express = require('express');
const Interaction = require('../models/interactionModel');
const { default: mongoose } = require('mongoose');


// Funzione per ottenere tutte le interazioni
const getAllInteractions = async (req, res) => {
    try { 
        const {id,city,date, postId, limit=20,offset=0} = req.query;
        let filter = {};

        if (date) {
            const startOfDay = new Date(date);
            const endOfDay = new Date(date);
            endOfDay.setHours(23, 59, 59, 999);
            filter.createdAt = { $gte: startOfDay, $lte: endOfDay };    
        }

        if (id) {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).send('ID non valido');
            }
            filter._id = id;
        }

         if (postId) {
            if (!mongoose.Types.ObjectId.isValid(postId)) {
                return res.status(400).send('ID post non valido');
            }
            filter.postId = postId;
        }

        let interactions = await Interaction.find(filter)
            .populate('userId')
            .skip(Number(offset))
            .limit(Number(limit))
            .exec();
            
        if (city) {
            interactions = interactions.filter(interaction => interaction.userId.city === city);
        }
                             
        if (interactions.length === 0) {
            return res.status(404).send('Nessuna interazione trovata');
        }
        res.status(200).json(interactions);
    } catch (error) {
        console.error('Errore durante il recupero delle interazioni:', error.message);

        res.status(500).send('Errore interno del server');
    }
}

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
        const interactionId = req.query.id
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
        console.error('Errore durante l\'aggiornamento delle interazioni:', error.message);

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
        console.error('Errore durante la cancellazione delle interazioni:', error.message);

        res.status(500).send('Errore interno del server')
    }
}

module.exports = {
    getAllInteractions,
    createInteraction,
    updateInteraction,
    deleteInteraction
};
