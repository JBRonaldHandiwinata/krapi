const express = require('express');
const {
    regBloger,
    loginBloger
} = require('../controllers/blogersController');

const router = express.Router();

router.post('/registration', regBloger);
router.post('/login', loginBloger);


module.exports = {
    routes: router
};