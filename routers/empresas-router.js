var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const data = require('../modules/database');

/* ******************************************
 *******        EMPRESAS          *********
 ****************************************** */


router.get('/', async function(req, res) {
    /* OBTENER TODAS LAS EMPRESAS */
    /* CONECCION A LA BASE DE DATOS */
    const db = await data.connectToDatabase();
    /* OBTENER COLLECION EMPRESAS */
    const empresas = await db.collection('empresas');
    /* CONSULTA */
    result = await empresas.find({}, {}).toArray();

    res.send(result);
    res.end();
});

/* OBTENER INFORMACION DE UNA EMPRESA */

router.get('/:idEmpresa', async(req, res) => {
    /* OBTENER TODAS LAS EMPRESAS */
    /* CONECCION A LA BASE DE DATOS */
    const db = await data.connectToDatabase();
    /* OBTENER COLLECION EMPRESAS */
    const empresas = await db.collection('empresas');
    /* CONSULTA */
    result = await empresas.find({
        _id: req.params.idEmpresa
    }, {}).toArray();

    res.send(result[0]);
    res.end()
});

/* AGREGAR UNA NUEVA EMPRESA */
router.post('/', async(req, res) => {
    /* OBTENER TODAS LAS EMPRESAS */
    /* CONECCION A LA BASE DE DATOS */
    const db = await data.connectToDatabase();
    /* OBTENER COLLECION EMPRESAS */
    const empresas = await db.collection('empresas');
    /* CONSULTA */
    let u = new empresas({
        nombreComercialEmpresa: req.body.empresa.nombreComercialEmpresa,
        RTN: req.body.empresa.RTN,
        direccion: req.body.empresa.direccion,
        logo: req.body.logo,
        banner: req.body.banner,
        descripcion: req.body.empresa.descripcion,
        telefonoContacto: req.body.empresa.telefonoContacto,
        estado: "activo",
        productosEmpresa: [],
        categorias: req.body.categorias,
        calificacion: 0,
        telefono: req.body.empresa.telefono
    });

    result = await empresas.insertOne(u);

    res.send(result);
    res.end();
});


/* ACTUALIZAR UNA EMPRESA */
router.put('/:id', async(req, res) => {
    /* OBTENER TODAS LAS EMPRESAS */
    /* CONECCION A LA BASE DE DATOS */
    const db = await data.connectToDatabase();
    /* OBTENER COLLECION EMPRESAS */
    const empresas = await db.collection('empresas');
    /* CONSULTA */
    console.log(req.body)
    result = await empresas.updateOne({
        _id: req.params.id
    }, {
        $set: {
            nombreComercialEmpresa: req.body.empresa.nombreComercialEmpresa,
            RTN: req.body.empresa.RTN,
            direccion: req.body.empresa.direccion,
            logo: req.body.logo,
            banner: req.body.banner,
            descripcion: req.body.empresa.descripcion,
            telefonoContacto: req.body.empresa.telefonoContacto,
            estado: req.body.empresa.estado,
            categorias: req.body.empresa.categorias,
            calificacion: req.body.empresa.calificacion,
            telefono: req.body.empresa.telefono
        }
    });

    res.send(result);
    res.end();
});

/* ELIMINAR UNA EMPRESA - ESTADO INACTIVO */
router.delete('/:id', async(req, res) => {
    /* OBTENER TODAS LAS EMPRESAS */
    /* CONECCION A LA BASE DE DATOS */
    const db = await data.connectToDatabase();
    /* OBTENER COLLECION EMPRESAS */
    const empresas = await db.collection('empresas');
    /* CONSULTA */
    result = await empresas.updateOne({
        _id: req.params.id
    }, {
        estado: "INACTIVO"
    });

    res.send(result);
    res.end();
});

/* ******************************************
 *******        PRODUCTOS         *********
 ****************************************** */

/* OBTENER TODOS LOS PRODUCTOS DE UNA EMPRESA */
router.get('/:idEmpresa/productos', async(req, res) => {
    /* OBTENER TODAS LAS EMPRESAS */
    /* CONECCION A LA BASE DE DATOS */
    const db = await data.connectToDatabase();
    /* OBTENER COLLECION EMPRESAS */
    const empresas = await db.collection('empresas');
    /* CONSULTA */
    result = await empresas.find({
        _id: mongoose.Types.ObjectId(req.params.idEmpresa)
    }, {
        _id: false,
        productosEmpresa: true
    });

    res.send(result[0].productosEmpresa);
    res.end();
});

/* AGREGAR UN NUEVO PRODUCTO */
router.post('/:idEmpresa/productos', async(req, res) => {
    /* OBTENER TODAS LAS EMPRESAS */
    /* CONECCION A LA BASE DE DATOS */
    const db = await data.connectToDatabase();
    /* OBTENER COLLECION EMPRESAS */
    const empresas = await db.collection('empresas');
    /* CONSULTA */
    console.log(req.body)
    let producto = new productos({
        _id: mongoose.Types.ObjectId(),
        nombreProducto: req.body.producto.nombreProducto,
        imagenProducto: req.body.img,
        imagenesCarrusel: req.body.banner, //carrucel
        descripcion: req.body.producto.descripcion,
        precio: req.body.producto.precio,
        estado: "activo"
    });
    result = await empresas.updateOne({
        _id: mongoose.Types.ObjectId(req.body.producto.empresa)
    }, {
        $push: {
            productosEmpresa: producto
        }
    });

    res.send(result);
    res.end();
});



module.exports = router;