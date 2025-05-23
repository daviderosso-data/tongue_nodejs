const express = require('express')
const User = require('../models/userModel');
const { default: mongoose } = require('mongoose');

// Funzione per ottenere tutti gli utenti
const getAllUsers = async (req, res) => {
    try {

        const { id, city, limit = 20, offset = 0 } = req.query;
        let filter = {};
        
        let users = await User.find(filter)
            .skip(Number(offset))
            .limit(Number(limit))
            .exec();
            
        if (id) {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).send('ID non valido');
            }
        filter._id = id;
        }
        
        if (city) {
            users = users.filter(user => user.city === city);
        }
        if (users.length === 0) {
            return res.status(404).send('Nessun utente trovato');
        } 


        if (users.length === 0) {
            return res.status(404).send('Nessun utente trovato');
        }

        res.status(200).json(users);
    } catch (error) {
        console.error('Errore durante il recupero degli utenti:', error.message);

        res.status(500).send('Errore interno del server');
    }
}


// Funzione per creare un nuovo utente
const createUser =async (req, res) => {
    try {
        const {name,age, city} = req.body

        if (!name || !age || !city) {
            return res.status(400).send('Tutti i campi sono obbligatori: nickname, age, city');
          }
      
        const newUser = new User({
            name,
            age,
            city
        })
        await newUser.save()
        res.status(201).json(newUser);
    }catch (error) {
        console.error('Errore durante la creazione degli utenti:', error.message);

        res.status(500).send('Errore interno del server')
    }
}

// Funzione per aggiornare un utente
const updateUser = async (req, res) => {
    try {
        const userId = req.params.id

        if (!userId) {
            return res.status(400).send('ID utente non fornito');
        }else if (!req.body) {
            return res.status(400).send('Dati utente non forniti');
        }else if (mongoose.Types.ObjectId.isValid(userId) === false) {
            return res.status(400).send('ID utente non valido');        
        }
        const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true })
        if (!updatedUser) {
            return res.status(404).send('Utente non trovato');
        }
        res.status(200).json(updatedUser);

    }catch (error) {
        console.error('Errore durante l\'aggiornamento degli utenti:', error.message);

        res.status(500).send('Errore interno del server')
    }
}
// Funzione per eliminare un utente
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id

        if (!userId) {
            return res.status(400).send('ID utente non fornito');
        }
        if (mongoose.Types.ObjectId.isValid(userId) === false) {
            return res.status(400).send('ID utente non valido');        
        }
        const deletedUser = await User.findByIdAndDelete(userId)
        res.status(200).json(deletedUser);
    }catch (error) {
        console.error('Errore durante la cancellazione degli utenti:', error.message);

        res.status(500).send('Errore interno del server')
    }
}


module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
};
