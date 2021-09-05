const express = require('express');
const {
    addPost, 
    getAllPosts, 
    updatePost,
    deletePost,
    readPost
} = require('../controllers/postsController');

const router = express.Router();

router.post('/newposts', addPost);
router.get('/allposts', getAllPosts);
router.get('/posts/:id', readPost);
router.put('/posts/:id', updatePost);
router.delete('/posts/:id', deletePost);


module.exports = {
    routes: router
};