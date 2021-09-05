'use strict';

const firebase = require('../db');
const Categories = require('../models/categories');
const firestore = firebase.firestore();

const FS_COLLECTION_NAME = 'categories';

const getAllCategories = async (req, res, next) => {
    try {
        const cats = await firestore.collection(FS_COLLECTION_NAME);
        const data = await cats.get();
        const catsArray = [];
        if(data.empty) {
            res.status(404).send('No post record found');
        }else {
            data.forEach(p => {
                const cats = new Categories(
                    p.id,
                    p.data().category
                );
                catsArray.push(cats);
            });
            res.status(200).send(catsArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getAllCategories
}