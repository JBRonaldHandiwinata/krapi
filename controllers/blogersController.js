'use strict';

const bcrypt = require("bcrypt");
const firebase = require('../db');
const Blogers = require('../models/blogers');
const firestore = firebase.firestore();

const FS_COLLECTION_NAME = 'blogers';

const regBloger = async (req, res) => {
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const snapemail = await firestore.collection(FS_COLLECTION_NAME).where('email', '==', req.body.email).get();
        const snapusername = await firestore.collection(FS_COLLECTION_NAME).where('username', '==', req.body.username).get();

        if(snapemail.empty && snapusername.empty){
            req.body.password = hashedPass;
            const data = req.body
            await firestore.collection(FS_COLLECTION_NAME).doc().set(data);
            res.status(200).send('registration success');
        }else{
            if(!snapemail.empty){
                res.status(200).json({'rc':'01', 'msg': 'Email already exists'});
            }
            if(!snapusername.empty){
                res.status(200).json({'rc':'01', 'msg': 'Username already exists'});
            }
        }
    }catch(error){
        res.status(400).send(error.message);
    }
}

const loginBloger = async (req, res) => {
    try{
        var user = "";
        var pwd = "";
        const udata = await firestore.collection(FS_COLLECTION_NAME)
                                     .where('username', '==', req.body.username)
                                     .get().then((querySnapshot) => {
                                                    querySnapshot.forEach((doc) => {
                                                            pwd = doc.data().password;
                                                            user = new Blogers(
                                                                doc.id,
                                                                doc.data().username,
                                                                doc.data().email,
                                                                doc.data().password
                                                            )
                                                    })
                                                });

        if(pwd===""){
            res.status(400).json({'rc':'01', 'msg': 'Wrong username'});
        }else{
            const validated = await bcrypt.compare(req.body.password, pwd);
            if(validated){
                res.status(200).json(user);
            }else{
                res.status(400).json({'rc':'01', 'msg': 'Invalid password'});
            }
        }
    }catch(error){
        res.status(400).send(error.message);
    }
}


module.exports = {
    regBloger,
    loginBloger
}