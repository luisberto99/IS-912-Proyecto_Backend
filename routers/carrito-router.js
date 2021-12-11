var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
const data = require('../modules/database');

/* OBTENER EMPRESAS EN CARRITO DE COMPRAS */
router.get('/:idCliente/empresas/:idEmpresa', async(req, res) => {

    /* CONECCION A LA BASE DE DATOS */
    const db = await data.connectToDatabase();
    /* OBTENER COLLECION CLIENTES */
    const Cliente = await db.collection('clientes');

    /* CONSULTA */
    result = await Cliente.find({
        _id: mongoose.Types.ObjectId(req.params.idCliente),
        "carrito.empresaID": mongoose.Types.ObjectId(req.params.idEmpresa)
    }, {
        "carrito.productos.$": true
    }).toArray();
    res.send(result);
    res.end();
});

/* AGREGAR UNA EMPRESA AL CARRITO DE COMPRAS */
router.post('/:idCliente/empresas/', async(req, res) => {

    /* CONECCION A LA BASE DE DATOS */
    const db = await data.connectToDatabase();
    /* OBTENER COLLECION CLIENTES */
    const Cliente = await db.collection('clientes');

    /* CONSULTA */
    console.log('Agregar empresa');
    result = await Cliente.updateOne({
        _id: mongoose.Types.ObjectId(req.params.idCliente)
    }, {
        $push: {
            carrito: {
                empresaID: mongoose.Types.ObjectId(req.body.empresa.empresaID),
                nombreEmpresa: req.body.empresa.nombreEmpresa,
                subTotal: 0,
                productos: [{
                    productoID: mongoose.Types.ObjectId(req.body.empresa.producto.productoID),
                    nombreProducto: req.body.empresa.producto.nombreProducto,
                    unidades: req.body.empresa.producto.unidades,
                    precio: req.body.empresa.producto.precio,
                    nota: req.body.empresa.producto.nota
                }]
            }
        }
    });

    res.send(result);
    res.end();
});

/* MODIFICAR SUBTOTAL DE UNA EMPRESA */
router.put('/:idCliente/empresas/:idEmpresa/', async(req, res) => {

    /* CONECCION A LA BASE DE DATOS */
    const db = await data.connectToDatabase();
    /* OBTENER COLLECION CLIENTES */
    const Cliente = await db.collection('clientes');

    /* CONSULTA */
    result = await Cliente.updateOne({
        _id: mongoose.Types.ObjectId(req.params.idCliente),
        "carrito.empresaID": mongoose.Types.ObjectId(req.params.idEmpresa)
    }, {
        $set: {
            "carrito.$.subTotal": parseInt(req.body.subTotal)
        }
    });

    res.send(result);
    res.end();
});


/* AGREGAR UN PRODUCTO  UNA EMPESA EN EL CARRITO DE COMPRAS  */
router.post('/:idCliente/empresas/:idEmpresa', async(req, res) => {

    /* CONECCION A LA BASE DE DATOS */
    const db = await data.connectToDatabase();
    /* OBTENER COLLECION CLIENTES */
    const Cliente = await db.collection('clientes');

    /* CONSULTA */
    console.log('Agregar producto')
    console.log(req.body.producto)
    result = await Cliente.updateOne({
        _id: mongoose.Types.ObjectId(req.params.idCliente),
        "carrito.empresaID": mongoose.Types.ObjectId(req.params.idEmpresa)
    }, {
        $push: {
            "carrito.$.productos": req.body.producto
        }
    });
    res.send(result);
    res.end();
});

/* MODICAR UN PRODUCTO EN EL CARRITO DE COMPRAS */
router.put('/:idCliente/producto/:idProductoCarrito', async(req, res) => {

    /* CONECCION A LA BASE DE DATOS */
    const db = await data.connectToDatabase();
    /* OBTENER COLLECION CLIENTES */
    const Cliente = await db.collection('clientes');

    /* CONSULTA */
    console.log(req.body.producto);
    result = await Cliente.updateOne({
        _id: mongoose.Types.ObjectId(req.params.idCliente),
        "carrito.productos.productoID": mongoose.Types.ObjectId(req.params.idProductoCarrito)
    }, {
        $set: {
            "carrito.productos.$": req.body.producto
        }
    });

    res.send(result);
    res.end();
});


/* OBTENER DATOS DEL CARRITO DE COMPRAS */
router.get('/:idCliente', async(req, res) => {

    /* CONECCION A LA BASE DE DATOS */
    const db = await data.connectToDatabase();
    /* OBTENER COLLECION CLIENTES */
    const Cliente = await db.collection('clientes');

    /* CONSULTA */
    result = await Cliente.find({
        _id: mongoose.Types.ObjectId(req.params.idCliente)
    }, {
        carrito: true
    }).toArray();

    res.send(result[0].carrito);
    res.end();
});


/* ELIMINAR UN PRODUCTO DEL CARRITO DE COMPRAS */
router.delete('/:idCliente/:idProducto', async(req, res) => {

    /* CONECCION A LA BASE DE DATOS */
    const db = await data.connectToDatabase();
    /* OBTENER COLLECION CLIENTES */
    const Cliente = await db.collection('clientes');

    /* CONSULTA */
    result = await Cliente.updateOne({
        _id: mongoose.Types.ObjectId(req.params.idCliente),
    }, {
        $pull: {
            carrito: { productoID: req.params.idProducto }
        }
    }, {
        multi: true
    });

    res.send(result);
    res.end();
});

/* NUMERO DE PRODUCTOS EN EL CARRITO DE COMPRAS */
router.get('/cantidad', async(req, res) => {
    /* TODO NUMERO DE PRODUCTOS EN EL CARRITO */
});

/* ELIMINAR UNA EMPRESA DEL CARRITO DE COMPRAS CUANDO SE HACE UN PEDIDIO */
router.delete('/:idCliente/empresa/:idEmpresa', async(req, res) => {

    /* CONECCION A LA BASE DE DATOS */
    const db = await data.connectToDatabase();
    /* OBTENER COLLECION CLIENTES */
    const Cliente = await db.collection('clientes');

    /* CONSULTA */
    result = await Cliente.updateOne({
        _id: mongoose.Types.ObjectId(req.params.idCliente)
    }, {
        $pull: {
            carrito: {
                empresaID: mongoose.Types.ObjectId(req.params.idEmpresa)
            }
        }
    });

    res.send(result);
    res.end();
});

module.exports = router;