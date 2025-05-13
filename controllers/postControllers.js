const express = require('express')
const Post = require('../models/postModel');
const { mongo } = require('mongoose');

// funzione per ottenere tutti i post
const getAllPosts = async (req, res) => {
    try {
      const posts = await Post.find({}); 
      if (posts.length === 0) {
        return res.status(404).send('Nessun post trovato');
      }
  
      res.status(200).json(posts);
    } catch (error) {
      console.error('Errore durante il recupero dei post:', error.message);
      res.status(500).send('Errore interno del server');
    }
  };

  // funzione per ottenere un post per ID
const getPostById = async (req, res) => {

    try {
        const postId = req.params.id
        const post = await Post.findById(postId)
        if (!post) {
            return res.status(404).send('Post non trovato');
        }
        res.status(200).json(post);     
}catch (error) {
        console.error('Errore durante il recupero dei post:', error.message);

        res.status(500).send('Errore interno del server')
    }
}

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


// Funzione per ottenere tutti i post di una città
const getAllPostsByCity = async (req, res) => {
    try {
        const city = req.params.city;
        if (!city) {
            return res.status(400).send('Città non fornita');
        }

        const posts = await Post.find({})
            .populate('userId')
            .exec();

       
        const filteredPosts = posts.filter(post => post.userId && post.userId.city === city);
        if (filteredPosts.length === 0) {
            return res.status(404).send('Nessun post trovato per la città specificata');
        }

        res.status(200).json(filteredPosts);
    } catch (error) {
        console.error('Errore durante il recupero dei post:', error.message);

        res.status(500).send('Errore interno del server');
    }
};


module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
    getAllPostsByCity
};

