var express = require('express');
var router = express.Router();
var empresas = require('../models/empresas');
var productos = require('../models/productos');
var mongoose = require('mongoose');

/* ******************************************
 *******        EMPRESAS          *********
 ****************************************** */

/* OBTENER TODAS LAS EMPRESAS */
router.get('/', function(req, res) {
    empresas.find({}, {})
        .then(result => {
            res.send(result);
            res.end();
        })
        .catch(error => {
            res.send(error);
            res.end();
        });
});

/* OBTENER INFORMACION DE UNA EMPRESA */

router.get('/:idEmpresa', (req, res) => {
    empresas.find({
            _id: req.params.idEmpresa
        }, {})
        .then(result => {
            res.send(result[0]);
            res.end()
        })
        .catch(error => {
            res.send(error);
            res.end();
        });
});

/* AGREGAR UNA NUEVA EMPRESA */
router.post('/', (req, res) => {
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
    u.save().then(result => {
            res.send(result);
            res.end();
        })
        .catch(error => {
            res.send(error);
            res.end();
        });
});


/* ACTUALIZAR UNA EMPRESA */
router.put('/:id', (req, res) => {
    console.log(req.body)
    empresas.updateOne({
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
        }).then(result => {
            res.send(result);
            res.end();
        })
        .catch(error => {
            res.send(error);
            res.end();
        });
});

/* ELIMINAR UNA EMPRESA - ESTADO INACTIVO */
router.delete('/:id', (req, res) => {
    empresas.updateOne({
            _id: req.params.id
        }, {
            estado: "INACTIVO"
        }).then(result => {
            res.send(result);
            res.end();
        })
        .catch(error => {
            res.send(error);
            res.end();
        });
});

/* ******************************************
 *******        PRODUCTOS         *********
 ****************************************** */

/* OBTENER TODOS LOS PRODUCTOS DE UNA EMPRESA */
router.get('/:idEmpresa/productos', (req, res) => {
    empresas.find({
            _id: mongoose.Types.ObjectId(req.params.idEmpresa)
        }, {
            _id: false,
            productosEmpresa: true
        }).then(result => {
            res.send(result[0].productosEmpresa);
            res.end();
        })
        .catch(error => {
            res.send(error);
            res.end();
        });
});

/* AGREGAR UN NUEVO PRODUCTO */
router.post('/:idEmpresa/productos', (req, res) => {
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
    empresas.updateOne({
            _id: mongoose.Types.ObjectId(req.body.producto.empresa)
        }, {
            $push: {
                productosEmpresa: producto
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



module.exports = router;