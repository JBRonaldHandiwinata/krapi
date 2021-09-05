const express = require('express');
const {
    getAllCategories 
} = require('../controllers/categoriesController');

const router = express.Router();

router.get('/allcats', getAllCategories);



module.exports = {
    routes: router
};