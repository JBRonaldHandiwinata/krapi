'use strict';

const firebase = require('../db');
const Posts = require('../models/posts');
const firestore = firebase.firestore();

const FS_COLLECTION_NAME = 'posts';


const addPost = async (req, res, next) => {
    try {
        const data = req.body;
        const resin = await firestore.collection(FS_COLLECTION_NAME).add(data);
        res.status(200).send(resin.id);
    } catch (error) {
        res.status(400).send(error.message);
    }
}


const getAllPosts = async (req, res, next) => {
    try {
        const posts = await firestore.collection(FS_COLLECTION_NAME);
        const data = await posts.get();
        const postsArray = [];
        if(data.empty) {
            res.status(404).send('No post record found');
        }else {
            data.forEach(p => {
                const posts = new Posts(
                    p.id,
                    p.data().categories,
                    p.data().title,
                    p.data().desc,
                    p.data().img,
                    p.data().username,
                    p.data().timestamp
                );
                postsArray.push(posts);
            });
            res.status(200).send(postsArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updatePost = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const posts =  await firestore.collection(FS_COLLECTION_NAME).doc(id);
        await posts.update(data);
        res.status(200).send('Your post updated successfuly');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deletePost = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection(FS_COLLECTION_NAME).doc(id).delete();
        res.status(200).send('Your Post deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const readPost = async (req, res, next) => {
    try {
        const id = req.params.id;
        const p = await firestore.collection(FS_COLLECTION_NAME).doc(id).get();
        const postContent = new Posts(
            p.id,
            p.data().categories,
            p.data().title,
            p.data().desc,
            p.data().img,
            p.data().username,
            p.data().timestamp
        );
        res.status(200).send(postContent);
    } catch (error) {
        res.status(400).send(error.message);
    }
}


module.exports = {
    addPost,
    getAllPosts,
    updatePost,
    deletePost,
    readPost
}