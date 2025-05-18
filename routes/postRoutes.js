const express = require('express')
const router = express.Router()

const { getAllPosts, createPost, updatePost, deletePost,} = require('../controllers/postControllers');


router.get('/', getAllPosts);
router.post('/', createPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);
module.exports = router


