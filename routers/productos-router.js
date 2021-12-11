var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const data = require('../modules/database');

/* OBTENER LA INFORMACION DE TODOS LOS PRODUCTOS */
router.get('', async(req, res) => {
    /* CONECCION A LA BASE DE DATOS */
    const db = await data.connectToDatabase();
    /* OBTENER COLLECION EMPRESAS */
    const empresas = await db.collection('empresas');
    /* CONSULTA */
    result = await empresas.find({}, {
        _id: true,
        nombreComercialEmpresa: true
    }).toArray();
    res.send(result[0]);
    res.end();
});

/* OBTENER LA INFORMACION DE UN PRODUCTO EN ESPECIFICO */
router.get('/:idProducto', async(req, res) => {
    /* CONECCION A LA BASE DE DATOS */
    const db = await data.connectToDatabase();
    /* OBTENER COLLECION EMPRESAS */
    const empresas = await db.collection('empresas');
    /* CONSULTA */
    result = await empresas.find({
        "productosEmpresa._id": mongoose.Types.ObjectId(req.params.idProducto)
    }, {
        "productosEmpresa.$": true,
        _id: true,
        nombreComercialEmpresa: true
    }).toArray();
    res.send(result[0]);
    res.end();
});

/* MODIFICAR UN PRODUCTO */
router.put('/:idProducto', async(req, res) => {
    /* CONECCION A LA BASE DE DATOS */
    const db = await data.connectToDatabase();
    /* OBTENER COLLECION EMPRESAS */
    const empresas = await db.collection('empresas');
    /* CONSULTA */
    console.log(req.body)
    result = await empresas.updateOne({
        "productosEmpresa._id": mongoose.Types.ObjectId(req.params.idProducto)
    }, {
        "productosEmpresa.$": {
            _id: mongoose.Types.ObjectId(req.params.idProducto),
            nombreProducto: req.body.producto.nombreProducto,
            imagenProducto: req.body.img,
            imagenesCarrusel: req.body.banner, //carrucel
            descripcion: req.body.producto.descripcion,
            precio: req.body.producto.precio,
            estado: req.body.producto.estado
        }
    })
    res.send(result);
    res.end();
});
/* ELIMINAR UN PRODUCTO - ESTADO: INACTIVO */
router.delete('/:idProducto', async(req, res) => {
    /* CONECCION A LA BASE DE DATOS */
    const db = await data.connectToDatabase();
    /* OBTENER COLLECION EMPRESAS */
    const empresas = await db.collection('empresas');
    /* CONSULTA */
    let producto = new productos({
        _id: mongoose.Types.ObjectId(),
        nombreProducto: req.body.nombreProducto,
        imagenProducto: req.body.imagenProducto,
        imagenesCarrusel: req.body.imagenesCarrusel, //carrucel
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        estado: "inactivo"
    });
    result = await empresas.updateOne({
        "productosEmpresa._id": mongoose.Types.ObjectId(req.params.idProducto)
    }, {
        "productosEmpresa.$.estado": "INACTIVO"
    })
    res.send(result);
    res.end();
});


module.exports = router;