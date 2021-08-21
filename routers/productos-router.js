var express = require('express');
var router = express.Router();
var productos = require('../models/productos');
var mongoose = require('mongoose');
var empresas = require('../models/empresas');

/* OBTENER LA INFORMACION DE TODOS LOS PRODUCTOS */
router.get('', (req, res) => {
    empresas.find({}, {
            _id: true,
            nombreComercialEmpresa: true
        }).then(result => {
            res.send(result[0]);
            res.end();
        })
        .catch(error => {
            res.send(error);
            res.end();
        });
});

/* OBTENER LA INFORMACION DE UN PRODUCTO EN ESPECIFICO */
router.get('/:idProducto', (req, res) => {
    empresas.find({
            "productosEmpresa._id": mongoose.Types.ObjectId(req.params.idProducto)
        }, {
            "productosEmpresa.$": true,
            _id: true,
            nombreComercialEmpresa: true
        }).then(result => {
            res.send(result[0]);
            res.end();
        })
        .catch(error => {
            res.send(error);
            res.end();
        });
});

/* MODIFICAR UN PRODUCTO */
router.put('/:idProducto', (req, res) => {
    console.log(req.body)
    empresas.updateOne({
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
        }).then(result => {
            res.send(result);
            res.end();
        })
        .catch(error => {
            res.send(error);
            res.end();
        });
});
/* ELIMINAR UN PRODUCTO - ESTADO: INACTIVO */
router.delete('/:idProducto', (req, res) => {
    let producto = new productos({
        _id: mongoose.Types.ObjectId(),
        nombreProducto: req.body.nombreProducto,
        imagenProducto: req.body.imagenProducto,
        imagenesCarrusel: req.body.imagenesCarrusel, //carrucel
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        estado: "inactivo"
    });
    empresas.updateOne({
            "productosEmpresa._id": mongoose.Types.ObjectId(req.params.idProducto)
        }, {
            "productosEmpresa.$.estado": "INACTIVO"
        }).then(result => {
            res.send(result);
            res.end();
        })
        .catch(error => {
            res.send(error);
            res.end();
        });
});


module.exports = router;