const express = require('express')
const Post = require('../models/postModel');
const { mongo } = require('mongoose');
const { post } = require('../routes/interactionRoutes');

// funzione per ottenere tutti i post
const getAllPosts = async (req, res) => {
    try {

      const { id, city, date, limit = 20, offset = 0 } = req.query;
      let filter = {};
        if (date) {
            const startOfDay = new Date(date);
            const endOfDay = new Date(date);
            endOfDay.setHours(23, 59, 59, 999);
            filter.createdAt = { $gte: startOfDay, $lte: endOfDay };
        }
        if (id) {   
            if (!mongo.ObjectId.isValid(id)) {
                return res.status(400).send('ID non valido');
            }
            filter._id = id;
        }


      let posts = await Post.find(filter)
      .populate('userId')
      .skip(Number(offset))
      .limit(Number(limit))
      .exec();

        if (city) {
        posts = posts.filter(post => post.userId && post.userId.city === city);
        }

      if (post.length === 0) {
        return res.status(404).send('Nessun post trovato');
      }
  
      res.status(200).json(posts);
    } catch (error) {
      console.error('Errore durante il recupero dei post:', error.message);
      res.status(500).send('Errore interno del server');
    }
  };

// funzione per creare un nuovo post
const createPost =async (req, res) => {
    try {
        const {title,text,userId} = req.body
        const newPost = new Post({
            title,
            text,
            userId
        })
        await newPost.save()
        res.status(201).json(newPost);
    }catch (error) {
        console.error('Errore durante la creazione dei post:', error.message);

        res.status(500).send('Errore interno del server')
    }
}

// Funzione per aggiornare un post
const updatePost = async (req, res) => {
    try {
        const postId = req.params.id

        if (!postId) {
            return res.status(400).send('ID del post non fornito');
        }else if (!req.body) {
            return res.status(400).send('Dati del post non forniti');
        }else if (mongoose.Types.ObjectId.isValid(postId) === false) {
            return res.status(400).send('ID del post non valido');
        }

        const updatedPost = await Post.findByIdAndUpdate(postId, req.body, { new: true })
        if (!updatedPost) {
            return res.status(404).send('Post non trovato');
        }
        res.status(200).json(updatedPost);

    }catch (error) {
        console.error('Errore durante l\'aggiornamento dei post:', error.message);

        res.status(500).send('Errore interno del server')
    }
}
// Funzione per eliminare un post
const deletePost = async (req, res) => {
    try {
        const postId = req.params.id

        if (!postId) {
            return res.status(400).send('ID del post non fornito');
        }
        if (mongoose.Types.ObjectId.isValid(postId) === false) {
            return res.status(400).send('ID del post non valido');
        }
        const deletedPost = await Post.findByIdAndDelete(postId)    
        res.status(200).json(deletedPost);
    }catch (error) {
        console.error('Errore durante la cancellazione dei post:', error.message);

        res.status(500).send('Errore interno del server')
    }
}

module.exports = {
    getAllPosts,
    createPost,
    updatePost,
    deletePost,
};

