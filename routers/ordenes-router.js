const express = require('express');
const router = express.Router();
const ordenes = require('../models/ordenes.js')
const mongoose = require('mongoose');



/* OBTENER TODAS LAS ORDENES DISPONIBLES*/
router.get('/disponibles',(req,res)=>{
    ordenes.find({estadoOrden:'Disponible'}).then(result =>{
        res.send(JSON.stringify(result));
        console.log(result);
        res.end();
    
    }).catch(e =>{
        res.send(e);
        res.end();
    })
});

/* OBTENER TODAS LAS ORDENES*/
router.get('/',(req,res)=>{
    ordenes.find().then(result =>{
        res.send(result);
        res.end();
    
    }).catch(e =>{
        res.send(e);
        res.end();
    })
});


/* OBTENER TODAS LAS ORDENES TOMADAS*/
router.get('/tomadas',(req,res)=>{
    ordenes.find({estadoOrden:'tomada'}).then(result =>{
        res.send(result);
        //console.log(result);
        res.end();
    
    }).catch(e =>{
        res.send(e);
        res.end();
    })
});

/* ACTUALIZAR EL ESTADO DE UNA ORDEN */
router.put('/update/:idOrden/:estado',(req,res)=>{
    console.log('siuu',req.params.idOrden,req.params.estado);
    ordenes.updateOne({_id:req.params.idOrden},{$set:{estadoOrden:`${req.params.estado}`}}).then(result =>{
        res.send({result})
        res.end();
    })
});

/* OBTENER ORDEN EN ESPECIFICO*/
router.get('/obtenerOrden/:idOrden', (req,res)=>{
    
    ordenes.find({_id:req.params.idOrden}).then(result =>{
        res.send(result[0]);
        res.end();
    }).catch(e =>{
        res.send(e);
        res.end()
    });
})

/* VERIFICAR SI UN MOTORISTA CUENTA CON UNA ORDEN TOMADA. FALSE=NO TIENE, TRUE=TIENE*/
router.get('/verifyOrden/:idMotorista', (req,res)=>{
    
    ordenes.find({_idMotorista:req.params.idMotorista}).then(result =>{
        if(result.length <1 ){
            res.send({result:false});
            res.end();
        }else{
            res.send({result:true});
            res.end();
        }
    }).catch(e =>{
        res.send(e);
        res.end();
    });
})


/* OBTENER ORDEN TOMADA ACTUALMENTE POR EL MOTORISTA */
router.get('/ordenTomadaMotorista/:idMotorista', (req,res)=>{
    
    ordenes.find({_idMotorista:req.params.idMotorista}).then(orden =>{
        if(orden.length <1 ){
            res.send({result:false});
            res.end();
        }else{
            res.send({result:true, orden:orden[0]});
            res.end();
        }
    }).catch(e =>{
        res.send(e);
        res.end();
    });
})

/* OBTENER LAS ORDENES ENTREGAS POR EL MOTORISTA */
router.get('/ordenesEntregadas/:idMotorista', (req,res)=>{
    
    ordenes.find({_idMotorista:req.params.idMotorista, estadoOrden:'Entregada'}).then(ordenes =>{
        res.send(ordenes);
        res.end();
    }).catch(e =>{
        res.send(e);
        res.end();
    });
})

/* ASIGNAR MOTORISTA A ORDEN */
router.put('/asignarMotorista',(req,res)=>{
    ordenes.updateOne({_id:req.body.idOrden},{
    estadoOrden:"Tomada",
    _idMotorista: req.body.idMotorista,
    nombreMotorista: req.body.nombreMotorista,
    apellidoMotorista: req.body.apellido
    }).then(result =>{
        res.send({result:true})
        res.end();

    }).catch(e =>{
        res.send({result:false});
        res.end();

    })

})


/* CREAR NUEVA ORDEN */

router.post("/nuevaOrden",(req,res)=>{
    let product = req.body.products 
    
    ordenes.create({
        nombreCliente:req.body.nombreCliente,
        ubicacionEntrega:req.body.ubicacion,
        fechaOrden:req.body.fecha,
        _idEmpresaDistribuye:req.body.idEmpresa,
        nombreEmpresaDistribuye:req.body.nombreEmpresa,
        productosOrden:product,
        estadoOrden:"Disponible",
        impuestoOrden:req.body.impuestoOrden,
        comisionMotorista:req.body.comisionBiker,
        totalCostoOrden:req.body.costoOrden,
        coordenadasUbicacionOrden:req.body.coordenadasOrden,
        "informacionPago.ultimosDigitosTargeta":req.body.digitosTargeta,
        "informacionPago.mesVencimiento":req.body.mesVence,
        "informacionPago.anoVencimiento":req.body.anoVence,
        "informacionPago.nombrePropietario":req.body.nombrePropietario,
        "informacionPago.numeroAutorizacionPago":req.body.numAutorizacionPago,
        comisionAdministrador:req.body.comisionAdmin

    }).then(result =>{

        res.send({result:true});
        res.end();

    }).catch(e =>{
        res.send({result:false});
        res.end();
    });
});

/* AGREGAR PRODUCTOS A ORDEN */
router.put("/agregarProductos",(req,res)=>{

    let product = req.body.products 
    
    ordenes.updateOne({_id:req.body.idOrden},
        {$push:{productosOrden:product}
        }).then(result =>{

        res.send(result);
        res.end();
    
    }).catch(e =>{
        res.send({result:false});
        res.end();
    })
    
});


/* AGREGAR PRODUCTO A ORDEN */
router.put("/agregarProducto",(req,res)=>{

    ordenes.updateOne({_id:req.body.idOrden},
        {$push:{
            productosOrden:{
                nombreProducto:req.body.nombreProduct,
                cantidad:req.body.cantidad,
                precio:req.body.precio,
                nota:req.body.nota}
            }
        }).then(result =>{
        res.send(result);
        res.end();
    
    }).catch(e =>{
        res.send({result:false});
        res.end();
    })
});

/* VERIFICAR SI MOTORISTA TIENE ACTUALMENTE UNA ORDEN TOMADA. */

router.get("/verificarOrdenMotorista",(req,res)=>{

    ordenes.find({_idMotorista:req.body.idMotorista},{estadoOrden:true}).then(result =>{
        let estado = true;
        result.forEach(orden => {
            if(orden.estadoOrden == "Tomada"){
                res.send({result:true});
                res.end();
                estado = false;
            }
        });

        if(estado){
            res.send({result:false});
            res.end();
        }

    }).catch(e =>{
        res.send({result:false});
        res.end();
    })

})

module.exports = router;