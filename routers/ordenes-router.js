const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const data = require('../modules/database');



/* OBTENER TODAS LAS ORDENES DISPONIBLES*/
router.get('/disponibles', async(req, res) => {
    /* CONECCION A LA BASE DE DATOS */
    const db = await data.connectToDatabase();
    /* OBTENER COLLECION ORDENES */
    const ordenes = await db.collection('ordenes');
    /* CONSULTA */
    result = await ordenes.find({
        estadoOrden: 'Disponible'
    }).toArray();

    res.send(JSON.stringify(result));
    // console.log(result);
    res.end();
});

/* OBTENER TODAS LAS ORDENES*/
router.get('/', async(req, res) => {
    /* CONECCION A LA BASE DE DATOS */
    const db = await data.connectToDatabase();
    /* OBTENER COLLECION ORDENES */
    const ordenes = await db.collection('ordenes');
    /* CONSULTA */
    result = await ordenes.find().toArray()
    res.send(result);
    res.end();
});


/* OBTENER TODAS LAS ORDENES TOMADAS*/
router.get('/tomadas', async(req, res) => {
    /* CONECCION A LA BASE DE DATOS */
    const db = await data.connectToDatabase();
    /* OBTENER COLLECION ORDENES */
    const ordenes = await db.collection('ordenes');
    /* CONSULTA */
    result = await ordenes.find({
        estadoOrden: 'Tomada'
    }).toArray();
    res.send(result);
    //console.log(result);
    res.end();
});

/* OBTENER TODAS LAS ORDENES DE UN CLIENTE */
router.get('/cliente/:idCliente', async(req, res) => {
    /* CONECCION A LA BASE DE DATOS */
    const db = await data.connectToDatabase();
    /* OBTENER COLLECION ORDENES */
    const ordenes = await db.collection('ordenes');
    /* CONSULTA */
    restul = await ordenes.find({
        _idCliente: mongoose.Types.ObjectId(req.params.idCliente)
    }).toArray().sort({
        _id: -1
    });

    res.send(result);
    res.end();
});

/* ACTUALIZAR EL ESTADO DE UNA ORDEN */
router.put('/updateOrden', async(req, res) => {
    /* CONECCION A LA BASE DE DATOS */
    const db = await data.connectToDatabase();
    /* OBTENER COLLECION ORDENES */
    const ordenes = await db.collection('ordenes');
    /* CONSULTA */
    // console.log('siuu',req.body.idOrden,req.body.estado);
    result = await ordenes.updateOne({
        _id: req.body.idOrden
    }, {
        $set: {
            estadoOrden: `${req.body.estado}`
        }
    });
    res.send({ result })
    res.end();
});

/* OBTENER ORDEN EN ESPECIFICO*/
router.get('/obtenerOrden/:idOrden', async(req, res) => {
    /* CONECCION A LA BASE DE DATOS */
    const db = await data.connectToDatabase();
    /* OBTENER COLLECION ORDENES */
    const ordenes = await db.collection('ordenes');
    /* CONSULTA */
    result = await ordenes.find({
        _id: req.params.idOrden
    }).toArray();
    res.send(result[0]);
    res.end();
});

/* VERIFICAR SI UN MOTORISTA CUENTA CON UNA ORDEN TOMADA. FALSE=NO TIENE, TRUE=TIENE*/
router.get('/verifyOrden/:idMotorista', async(req, res) => {
    /* CONECCION A LA BASE DE DATOS */
    const db = await data.connectToDatabase();
    /* OBTENER COLLECION ORDENES */
    const ordenes = await db.collection('ordenes');
    /* CONSULTA */
    result = await ordenes.find({
        _idMotorista: req.params.idMotorista
    }).toArray();

    if (result.length < 1) {
        res.send({ result: false });
        res.end();
    } else {
        res.send({ result: true });
        res.end();
    }
});


/* OBTENER ORDEN TOMADA ACTUALMENTE POR EL MOTORISTA */
router.get('/ordenTomadaMotorista/:idMotorista', async(req, res) => {
    /* CONECCION A LA BASE DE DATOS */
    const db = await data.connectToDatabase();
    /* OBTENER COLLECION ORDENES */
    const ordenes = await db.collection('ordenes');
    /* CONSULTA */
    orden = await ordenes.find({
        _idMotorista: req.params.idMotorista
    }).toArray();


    if (orden.length < 1) {
        res.send({ result: false });
        res.end();
    } else {
        let status = false;
        for (let i = 0; i < orden.length; i++) {
            if (orden[i].estadoOrden == "Tomada") {
                res.send(orden[i]);
                res.end();
                status = true;
            }
        }
        if (status == false) {

            res.send({ result: false });
            res.end();
        }
    }
});

/* OBTENER LAS ORDENES ENTREGAS POR EL MOTORISTA */
router.get('/ordenesEntregadas/:idMotorista', async(req, res) => {
    /* CONECCION A LA BASE DE DATOS */
    const db = await data.connectToDatabase();
    /* OBTENER COLLECION ORDENES */
    const ordenes = await db.collection('ordenes');
    /* CONSULTA */
    ordenes = await ordenes.find({
        _idMotorista: req.params.idMotorista,
        estadoOrden: 'Entregada'
    }).toArray();


    res.send(ordenes);
    res.end();
});

/* ASIGNAR MOTORISTA A ORDEN */
router.put('/asignarMotorista', async(req, res) => {
    /* CONECCION A LA BASE DE DATOS */
    const db = await data.connectToDatabase();
    /* OBTENER COLLECION ORDENES */
    const ordenes = await db.collection('ordenes');
    /* CONSULTA */
    result = await ordenes.updateOne({
        _id: req.body.idOrden
    }, {
        $set: {
            estadoOrden: "Tomada",
            _idMotorista: req.body.idMotorista,
            nombreMotorista: req.body.nombreMotorista,
            apellidoMotorista: req.body.apellido
        }
    });
    res.send({ result: true })
    res.end();

});


/* CREAR NUEVA ORDEN */

router.post("/nuevaOrden", async(req, res) => {
    /* CONECCION A LA BASE DE DATOS */
    const db = await data.connectToDatabase();
    /* OBTENER COLLECION ORDENES */
    const ordenes = await db.collection('ordenes');
    /* CONSULTA */
    console.log(req.body.orden.informacionPago)
    result = await ordenes.insertOne({
        nombreCliente: req.body.orden.informacionPago.nombrePropietario,
        _idCliente: req.body.orden._idCliente,
        ubicacionEntrega: req.body.orden.ubicacionEntrega,
        fechaOrden: req.body.orden.fechaOrden,
        _idEmpresaDistribuye: req.body.orden._idEmpresaDistribuye,
        nombreEmpresaDistribuye: req.body.orden.nombreEmpresaDistribuye,
        productosOrden: req.body.orden.productosOrden,
        estadoOrden: "Disponible",
        impuestoOrden: req.body.orden.impuestoOrden,
        comisionMotorista: req.body.orden.comisionMotorista,
        totalCostoOrden: req.body.orden.totalCostoOrden,
        coordenadasUbicacionOrden: req.body.orden.coordenadasUbicacionOrden,
        "informacionPago.ultimosDigitosTargeta": req.body.orden.digitosTargeta,
        "informacionPago.mesVencimiento": req.body.orden.mesVence,
        "informacionPago.anoVencimiento": req.body.orden.anoVence,
        "informacionPago.nombrePropietario": req.body.orden.nombrePropietario,
        "informacionPago.numeroAutorizacionPago": req.body.orden.numAutorizacionPago,
        comisionAdministrador: req.body.orden.comisionAdministrador

    });
    res.send(result);
    res.end();
});

/* AGREGAR PRODUCTOS A ORDEN */
router.put("/agregarProductos", async(req, res) => {
    /* CONECCION A LA BASE DE DATOS */
    const db = await data.connectToDatabase();
    /* OBTENER COLLECION ORDENES */
    const ordenes = await db.collection('ordenes');
    /* CONSULTA */
    let product = req.body.orden.products

    result = await ordenes.updateOne({
        _id: req.body.orden.idOrden
    }, {
        $push: { productosOrden: product }
    })

    res.send(result);
    res.end();

});


/* AGREGAR PRODUCTO A ORDEN */
router.put("/agregarProducto", async(req, res) => {
    /* CONECCION A LA BASE DE DATOS */
    const db = await data.connectToDatabase();
    /* OBTENER COLLECION ORDENES */
    const ordenes = await db.collection('ordenes');
    /* CONSULTA */
    result = await ordenes.updateOne({
        _id: req.body.orden.idOrden
    }, {
        $push: {
            productosOrden: {
                nombreProducto: req.body.orden.nombreProduct,
                cantidad: req.body.orden.cantidad,
                precio: req.body.orden.precio,
                nota: req.body.orden.nota
            }
        }
    })
    res.send(result);
    res.end();
});

/* VERIFICAR SI MOTORISTA TIENE ACTUALMENTE UNA ORDEN TOMADA. */

router.get("/:idMotorista/verificarOrdenMotorista", async(req, res) => {
    /* CONECCION A LA BASE DE DATOS */
    const db = await data.connectToDatabase();
    /* OBTENER COLLECION ORDENES */
    const ordenes = await db.collection('ordenes');
    /* CONSULTA */
    result = await ordenes.find({
        _idMotorista: req.params.idMotorista
    }, {
        estadoOrden: true
    });
    let estado = true;
    result.forEach(orden => {
        if (orden.estadoOrden == "Tomada") {
            res.send({ result: true });
            res.end();
            estado = false;
        }
    });

    if (estado) {
        res.send({ result: false });
        res.end();
    }

})

module.exports = router;