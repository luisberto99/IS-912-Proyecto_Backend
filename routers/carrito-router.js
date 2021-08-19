var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Carrito = require('../models/carrito');
var ProductoCarrito = require('../models/productoCarrito');
var Cliente = require('../models/clientes');

/* OBTENER EMPRESAS EN CARRITO DE COMPRAS */
router.get('/:idCliente/empresas/:idEmpresa', (req, res) => {
    Cliente.find({
            _id: mongoose.Types.ObjectId(req.params.idCliente),
            "carrito.empresaID": mongoose.Types.ObjectId(req.params.idEmpresa)
        }, {
            "carrito.productos.$": true
        }).then(result => {
            res.send(result[0].carrito);
            res.end();
        })
        .catch(error => {
            res.send(error);
            res.end();
        });
});

/* AGREGAR UNA EMPRESA AL CARRITO DE COMPRAS */
router.post('/:idCliente/empresas/', (req, res) => {

    Cliente.updateOne({
            _id: mongoose.Types.ObjectId(req.params.idCliente)
        }, {
            $push: {
                carrito: {
                    empresaID: mongoose.Types.ObjectId(req.body.empresa.empresaID),
                    nombreEmpresa: req.body.empresa.nombreEmpresa,
                    subTotal: 0,
                    "productos": [{
                        productoID: mongoose.Types.ObjectId(req.body.empresa.producto.productoID),
                        unidades: req.body.empresa.producto.unidades,
                        precio: req.body.empresa.producto.precio,
                        nota: req.body.empresa.producto.nota
                    }]
                }
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

/* MODIFICAR SUBTOTAL DE UNA EMPRESA */
router.post('/:idCliente/empresas/:idEmpresa/', (req, res) => {
    Cliente.updateOne({
            _id: mongoose.Types.ObjectId(req.params.idCliente),
            "carrito.empresaID": mongoose.Types.ObjectId(req.params.idEmpresa)
        }, {
            $set: {
                "carrito.$.subTotal": parseInt(req.body.subTotal)
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


/* AGREGAR UN PRODUCTO  UNA EMPESA EN EL CARRITO DE COMPRAS  */
router.post('/:idCliente/empresas/:idEmpresa', (req, res) => {
    Cliente.updateOne({
            _id: mongoose.Types.ObjectId(req.params.idCliente),
            "carrito.empresaID": mongoose.Types.ObjectId(req.params.idEmpresa)
        }, {
            $push: {
                "carrito.$.productos": req.body.producto
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
router.put('/:idCliente/producto/:idProductoCarrito', (req, res) => {
    console.log(req.body.producto);
    Cliente.updateOne({
            _id: mongoose.Types.ObjectId(req.params.idCliente),
            "carrito.productos.productoID": mongoose.Types.ObjectId(req.params.idProductoCarrito)
        }, {
            $set: {
                "carrito.productos.$": req.body.producto
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

/* NUMERO DE PRODUCTOS EN EL CARRITO DE COMPRAS */
router.get('/cantidad', (req, res) => {

});

/* TODO GENERAR ORDEN */

module.exports = router;