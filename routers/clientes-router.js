var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const data = require('../modules/database');


//Obtener clientes
router.get('/', async function(req, res) {
    /* CONECCION A LA BASE DE DATOS */
    const db = await data.connectToDatabase();
    /* OBTENER COLLECION CLIENTES */
    const clientes = await db.collection('clientes');
    /* CONSULTA */
    result = await clientes.find({}, {
        password: false
    }).toArray();

    res.send(result);
    res.end();
});

/* AGREGAR UN NUEVO CLIENTE */
router.post('/', async(req, res) => {
    /* CONECCION A LA BASE DE DATOS */
    const db = await data.connectToDatabase();
    /* OBTENER COLLECION CLIENTES */
    const clientes = await db.collection('clientes');
    /* CONSULTA */
    let u = new clientes({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        imagenPerfil: "https://ibb.co/4F9qLBs",
        correoElectronico: req.body.email,
        fechaRegistro: new Date,
        password: req.body.password,
        telefono: "",
        ubicacion: "req.body.ubicacion",
        carrito: [],
        ordenes: [],
        estado: "activo"
    });

    result = await clientes.insertOne(u);
    res.send(result);
    res.end();
});

//Obtener un cliente
router.get('/:idCliente', async function(req, res) {
    /* CONECCION A LA BASE DE DATOS */
    const db = await data.connectToDatabase();
    /* OBTENER COLLECION CLIENTES */
    const clientes = await db.collection('clientes');
    /* CONSULTA */
    result = await clientes.find({
        _id: mongoose.Types.ObjectId(req.params.idCliente)
    }, {
        password: false
    }).toArray();

    res.send(result[0]);
    res.end();
});


//Obtener un cliente con correo
router.get('/:email/email', async function(req, res) {
    /* CONECCION A LA BASE DE DATOS */
    const db = await data.connectToDatabase();
    /* OBTENER COLLECION CLIENTES */
    const clientes = await db.collection('clientes');
    /* CONSULTA */
    result = await console.log(typeof(req.params.email))
    clientes.find({
        correoElectronico: req.params.email
    }, {
        password: true,
        _id: true,
        correoElectronico: true
    }).toArray();

    res.send(result[0]);
    res.end();
});

/* MODIFICAR UN CLIENTE */
router.put('/:idCliente', async(req, res) => {
    /* CONECCION A LA BASE DE DATOS */
    const db = await data.connectToDatabase();
    /* OBTENER COLLECION CLIENTES */
    const clientes = await db.collection('clientes');
    /* CONSULTA */
    result = await clientes.updateOne({
        _id: mongoose.Types.ObjectId(req.params.idCliente)
    }, {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        imagenPerfil: req.body.imagenPerfil,
        correoElectronico: req.body.correoElectronico,
        fechaRegistro: new Date,
        password: req.body.password,
        telefono: req.body.telefono,
        ubicacion: req.body.ubicacion,
    });

    res.send(result);
    res.end();
});

/* ELIMINAR UN CLIENTE - ESTADO INACTIVO */
router.delete('/:idCliente', async(req, res) => {
    /* CONECCION A LA BASE DE DATOS */
    const db = await data.connectToDatabase();
    /* OBTENER COLLECION CLIENTES */
    const clientes = await db.collection('clientes');
    /* CONSULTA */
    result = await clientes.updateOne({
        _id: mongoose.Types.ObjectId(req.params.idCliente)
    }, {
        estado: "INACTIVO"
    });

    res.send(result);
    res.end();
});


module.exports = router;