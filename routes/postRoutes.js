const express = require('express')
const router = express.Router()

const { getAllPosts, getPostById, createPost, updatePost, deletePost,getAllPostsByCity} = require('../controllers/postControllers');


router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.post('/', createPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);
router.get('/city/:city', getAllPostsByCity);

module.exports = router


