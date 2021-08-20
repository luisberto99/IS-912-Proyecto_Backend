const administradores = require('../models/administradores');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const CryptoJS = require("crypto-js");


router.post('/createNewUser',(req,res)=>{

    let emailCrypto = CryptoJS.AES.encrypt(req.body.email, 'secretKeyDW2021***').toString();
    let passCrypto = CryptoJS.AES.encrypt(req.body.password, 'secretKeyDW2021***').toString();
    administradores.create({
        primerNombre:req.body.name,
        primerApellido:req.body.fullName,
        password:passCrypto,
        email:emailCrypto
    }).then(result =>{

        res.send({result:true})
        res.end();
        
    }).catch(e=>{
        res.send({result:false});
        res.end();
    })
});



module.exports = router;