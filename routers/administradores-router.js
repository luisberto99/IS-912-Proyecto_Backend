const administradores = require('../models/administradores');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const CryptoJS = require("crypto-js");


/* CREACION DE CUENTA ADMINISTRADOR Y ENCRIPTACION DE LA INFORMACION */
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

/* LOGIN ADMIN */

router.post('/login',(req,res)=>{

    
    administradores.find({},{email:true,password:true}).then(users =>{
        
        let state = true;

        for (let i = 0; i < users.length; i++) {
            let bytes  = CryptoJS.AES.decrypt(users[i].email, 'secretKeyDW2021***');
            let emailDecrypt = bytes.toString(CryptoJS.enc.Utf8);
        
            let bytesPass  = CryptoJS.AES.decrypt(users[i].password, 'secretKeyDW2021***');
            let passDescript = bytesPass.toString(CryptoJS.enc.Utf8);
            
            // console.log(passDescript,emailDecrypt);
            if(passDescript == req.body.password && emailDecrypt == req.body.email){

                res.send({result:true,id:users[i]._id});
                res.end();
                state = false;
                
            }
        }
        if(state){
            res.send({result:false})
            res.end();
        }

    })

})

/* OBTENER NOMBRE Y APELLIDO ADMIN */

router.get("/:idAdmin/datos",(req,res)=>{
    administradores.find({_id:req.params.idAdmin},{primerNombre:true,primerApellido:true}).then(result =>{
        res.send(result[0]);
        res.end();

    }).catch(e =>{

        res.send({result:false});
        res.end();
    })

})
module.exports = router;