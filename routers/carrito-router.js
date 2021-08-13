var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Carrito = require('../models/carrito');
var ProductoCarrito = require('../models/productoCarrito');
var Cliente = require('../models/clientes');

/* AGREGAR UN PRODUCTO AL CARRITO DE COMPRAS  */
router.post('/:idCliente/', (req, res) => {
    let producto = new ProductoCarrito({
        _id: mongoose.Types.ObjectId(),
        productoID: req.body.productoID,
        cantidad: req.body.cantidad,
        nota: req.body.nota
    });
    Cliente.updateOne({
            _id: mongoose.Types.ObjectId(req.params.idCliente)
        }, {
            $push: {
                carrito: producto
            }
        }).then(result => {
            res.send(result);
            res.end();
        })
        .catch(error => {
            res.send(error);
            res.end();
        });
});

/* MODICAR UN PRODUCTO EN EL CARRITO DE COMPRAS */
router.put('/producto/:idProductoCarrito', (req, res) => {
    let producto = new ProductoCarrito({
        _id: mongoose.Types.ObjectId(),
        productoID: req.body.productoID,
        cantidad: req.body.cantidad,
        nota: req.body.nota
    });
    Cliente.updateOne({
            "carrito._id": mongoose.Types.ObjectId(req.params.idProductoCarrito)
        }, {
            "carrito.$": producto
        }).then(result => {
            res.send(result);
            res.end();
        })
        .catch(error => {
            res.send(error);
            res.end();
        });
});


/* OBTENER DATOS DEL CARRITO DE COMPRAS */
router.get('/:idCliente', (req, res) => {
    Cliente.find({
            _id: mongoose.Types.ObjectId(req.params.idCliente)
        }, {
            carrito: true
        }).then(result => {
            res.send(result[0].carrito);
            res.end();
        })
        .catch(error => {
            res.send(error);
            res.end();
        });
});


/* ELIMINAR UN PRODUCTO DEL CARRITO DE COMPRAS */
router.delete('/:idCliente/:idProducto', (req, res) => {
    Cliente.updateOne({
            _id: mongoose.Types.ObjectId(req.params.idCliente),
        }, {
            $pull: {
                carrito: { productoID: req.params.idProducto }
            }
        }, {
            multi: true
        }).then(result => {
            res.send(result);
            res.end();
        })
        .catch(error => {
            res.send(error);
            res.end();
        });
});

/* TODO GENERAR ORDEN */

module.exports = router;