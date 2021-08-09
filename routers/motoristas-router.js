const express = require('express')
const router = express.Router();
const motoristas = require('../models/motoristas');
const mongoose = require('mongoose');

/* OBTENER TODOS LOS MOTORISTAS VERIFICADOS */
router.get('/',(req,res)=>{
    
   motoristas.find({estadoVerificacionMotorista:true}).then(result =>{
    res.send(result);
    res.end();

   }).catch(e =>{
    res.send(e);
    res.end();
   }) 
});

module.exports = router;

/* OBTENER LOS MOTORISTAS AUN FALTANTES POR VERIFICAR */

router.get('/FaltantesVerificar',(req,res)=>{
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
    motoristas.create({
        primerNombre :req.body.primerNombre,
        primerApellido :req.body.primerApellido,
        numeroIdentidad :req.body.numeroIdentidad,
        numeroTelefono :req.body.numTelefono,
        email :req.body.email,
        password :req.body.password,
        domicilio :req.body.domicilio,
        imagenPerfil :"",
        estadoVerificacionMotorista :false ,
        datosVerificacionMotorista : {administradorVerifica:"",fecha:""},
        ordenesEntregadas :[] ,
        ordenTomadaActualmente :[]
    }).then(result =>{
        res.send({result:true});
        res.end();
    }).catch(e =>{
        res.send({result:false});
        res.end();
    })
});

/* CAMBIAR ESTADO DEL MOTORISTA A VERIFICADO */
router.post('/verificar',(req,res)=>{
    
    motoristas.updateOne({_id:req.body.idMotorista},{estadoVerificacionMotorista:true}).then(result =>{
        res.send(result);
        res.end();
    }).catch(e =>{
        res.send(e);
        res.end();
    });
});

/* OBTENER CREDENCIALES PARA VERIFICAR REGISTRO DEL MOTORISTA */
router.get('/obtenerDatos/:email',(req,res)=>{
    motoristas.findOne({email:req.params.email}).then(result =>{
        res.send({result:result.password, idUser: result._id});
        res.end();

    }).catch(e =>{
        res.send({result:false});
        res.end();
    })
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

/* ACTUALIZAR CORREO MOTORISTA */
/* ACTUALIZAR PASSWORD MOTORISTA */
/* OBTENER MOTORISTAS DISPONIBLES */

