const express = require('express')
const router = express.Router();
const motoristas = require('../models/motoristas');
const mongoose = require('mongoose');
var CryptoJS = require("crypto-js");

/* APIS MOTORISTAS */

/* OBTENER TODOS LOS MOTORISTAS VERIFICADOS */
router.get('/verificados',(req,res)=>{
    
   motoristas.find({estadoVerificacionMotorista:true}).then(result =>{
    res.send(result);
    res.end();

   }).catch(e =>{
    res.send(e);
    res.end();
   }) 
});


/* OBTENER LOS MOTORISTAS AUN FALTANTES POR VERIFICAR */

router.get('/faltanVerificar',(req,res)=>{
    motoristas.find({estadoVerificacionMotorista:false}).then(result =>{
        res.send(result);
        res.end();
    
       }).catch(e =>{
        res.send({result:false});
        res.end();
       }) 
});


/* CREAR NUEVO MOTORISTA */


router.post('/registrar',(req,res)=>{

    
    motoristas.find({},{email:true}).then(result =>{
        let emails = [];

        result.forEach(user => {
            // console.log(user);
            let bytes  = CryptoJS.AES.decrypt(user.email, 'secretKeyDW2021***');
            let emailDescript = bytes.toString(CryptoJS.enc.Utf8);

            emails.push(emailDescript);
        });
        // console.log(emails);

        if(!(emails.includes(req.body.email))){
            let emailCrypto = CryptoJS.AES.encrypt(req.body.email, 'secretKeyDW2021***').toString();
            let passCrypto = CryptoJS.AES.encrypt(req.body.password, 'secretKeyDW2021***').toString();

            motoristas.create({
                primerNombre :req.body.primerNombre,
                primerApellido :req.body.primerApellido,
                numeroIdentidad :req.body.identidad,
                numeroTelefono :req.body.telefono,
                email :emailCrypto,
                password :passCrypto,
                domicilio :req.body.domicilio,
                estadoVerificacionMotorista :false ,
                ordenesEntregadas :[] ,
                ordenTomadaActualmente :[],
                estadoParaEntregarOrdenes:false
            }).then(result =>{
                res.send({result:true});
                res.end();
            }).catch(e =>{
                res.send({result:false});
                res.end();
            })
            
        }else{
          res.send({result:false});
          res.end();
        }
        
    })

});


/* CAMBIAR ESTADO DEL MOTORISTA A VERIFICADO, DESDE ADMINISTRACION */

router.put('/:idMotorista/verificar',(req,res)=>{
    
    motoristas.updateOne({_id:req.params.idMotorista},{$push:{ RegistroVerificacionCuenta: {nombre:req.body.nombreAdmin,apellido:req.body.apellidoAdmin,_idAdministrador: mongoose.Types.ObjectId(req.body.idAdmin)}},estadoVerificacionMotorista:true}).then(result =>{
        res.send(result);
        res.end();
    }).catch(e =>{
        res.send({result:false});
        res.end();
    });
    
});



/* API PARA VERIFICAR SI LA CUENTA DE UN MOTORISTA EXISTE. */

router.get('/obtenerDatos/:email',(req,res)=>{

    motoristas.find({},{email:true}).then(result =>{
        let emails = [];

        result.forEach(user => {
            // console.log(user);
            let bytes  = CryptoJS.AES.decrypt(user.email, 'secretKeyDW2021***');
            let emailDescript = bytes.toString(CryptoJS.enc.Utf8);

            emails.push(emailDescript);
        });

        if(emails.includes(req.params.email)){
            res.send(true);
            res.end();
            
        }else{
            res.send(false);
            res.end();
        }
        
    }).catch(e=>{
        res.send(false);
        res.end();
    })
    
    // motoristas.findOne({email:req.params.email}).then(result =>{
    //     //     res.send({result:result.password, idUser: result._id});
    //     //     res.end();
    
    //     // }).catch(e =>{
    //     //     res.send({result:false});
    //     //     res.end();
    // })

});

/* AGREGAR IMAGEN A PERFIL MOTORISTA */

router.post('/newImage',(req,res)=>{
    motoristas.updateOne({_id:req.body.idUser},{imagenPerfil:req.body.imagen}).then(result =>{
        res.send(result);
        res.end();

    }).catch(e =>{
        res.send({result:false});
        res.end();
    });

});

/* API PARA OBTENER IMAGEN DEL PERFIL DEL MOTORISTA */

router.get('/obtenerImagenPerfil/:idUser',(req,res)=>{

    motoristas.findOne({_id:req.params.idUser},{imagenPerfil:true}).then(result =>{
        res.send(result);
        res.end();

    }).catch(e =>{
        res.send(false);
        res.end();
    })

});

/* LOGIN MOTORISTA */

router.post('/login',(req,res)=>{

    motoristas.find({},{email:true,password:true}).then(result =>{
        let verify = true;
        result.forEach(user => {
            // console.log(user);

            let bytes  = CryptoJS.AES.decrypt(user.email, 'secretKeyDW2021***');
            let emailDecrypt = bytes.toString(CryptoJS.enc.Utf8);

            let bytesPass  = CryptoJS.AES.decrypt(user.password, 'secretKeyDW2021***');
            let passDecrypt = bytesPass.toString(CryptoJS.enc.Utf8);
            // console.log(emailDecrypt,passDecrypt);
            if(req.body.password == passDecrypt && req.body.email == emailDecrypt){
              res.send({result:true, id:user._id});
              res.end();  
              verify = false
            }

        });
        if(verify){
            res.send({result:false});
            res.end();  
        }
        
    }).catch(e=>{
        res.send(false);
        res.end();
    })

});


/* CONFIGURACION PERFIL USUARIO, ACTUALIZAR CORREO MOTORISTA */

router.put("/configuracion/cambiarCorreo",(req,res)=>{

    // console.log(req.body.email,req.body.idUser);
    let emailEncrypt = CryptoJS.AES.encrypt(req.body.email, 'secretKeyDW2021***').toString();

    motoristas.updateOne({_id:req.body.idUser},{email:emailEncrypt}).then(result =>{

        res.send(result);
        res.end();
    }).catch(e =>{
        res.send({result:false});
        res.end();
    });

});

/* OBTENER MOTORISTA APARTIR DE SU _ID */

router.get("/obtenerMotorista/:idMotorista",(req,res)=>{
    motoristas.find({_id:req.params.idMotorista},{primerNombre:true,primerApellido:true,domicilio:true,email:true}).then(result =>{
        let datosMotorista = result[0];
        let emailMotorista = result[0].email;
        
        let bytes  = CryptoJS.AES.decrypt(emailMotorista, 'secretKeyDW2021***');
        let emailDecrypt = bytes.toString(CryptoJS.enc.Utf8)
        datosMotorista.email = emailDecrypt;
        res.send(datosMotorista);
        res.end();

    }).catch(e=>{

        res.send({result:false});
        res.end();
    })
})

/* ACTUALIZAR PASSWORD MOTORISTA */

router.put("/nuevaContrasena",(req,res)=>{

    motoristas.find({_id:req.body.idBiker},{password:true}).then(result =>{
        let bytesPass  = CryptoJS.AES.decrypt(result[0].password, 'secretKeyDW2021***');
        let passDecrypt = bytesPass.toString(CryptoJS.enc.Utf8);
        // console.log(passDecrypt);
        if(passDecrypt == req.body.password){

            let passEncrypt = CryptoJS.AES.encrypt(req.body.newPassword, 'secretKeyDW2021***').toString();

            motoristas.updateOne({_id:req.body.idBiker},{password:passEncrypt}).then(result =>{
                res.send(result);
                res.end();
                
            }).catch(e =>{

                res.send({result:false});
                res.end();
            })

        }else{

            res.send({result:false});
            res.end(); 
        }

    }).catch(e =>{

        res.send({result:false});
        res.end();
    })
})

/* OBTENER MOTORISTAS DISPONIBLES Y ACTIVOS PARA TRABAJAR */

router.get("/a",(req,res) =>{
    motoristas.find({}).then(result =>{
        res.send(result);
        res.end();
    })
})

module.exports = router;
