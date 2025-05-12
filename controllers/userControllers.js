const express = require('express')
const User = require('../models/userModel');
const { default: mongoose } = require('mongoose');

// Funzione per ottenere tutti gli utenti
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});                          

        if (users.length === 0) {
            return res.status(404).send('Nessun utente trovato');
        }

        res.status(200).json(users);
    } catch (error) {
        res.status(500).send('Errore interno del server');
    }
}

// Funzione per ottenere un utente per ID
const getUserById = async (req, res) => {
    try {
        const userId = req.params.id
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).send('Utente non trovato');
        }   
        res.status(200).json(user);
    }catch (error) {
        res.status(500).send('Errore interno del server')
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
        res.status(500).send('Errore interno del server')
    }
}


module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}
