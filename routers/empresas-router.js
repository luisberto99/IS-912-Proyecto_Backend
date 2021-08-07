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
    empresas.find({}, {
            _id: true,
            nombreComercialEmpresa: true,
            banner: true,
            descripcion: true,
            calificacion: true,
            RTN: true
        })
        .then(result => {
            res.send(result);
            res.end();
        })
        .catch(error => {
            console.log('error');
            res.send(error);
            res.end();
        });
});

/* OBTENER INFORMACION DE UNA EMPRESA */

router.get('/:idEmpresa', (req, res) => {
    empresas.find({
            _id: req.params.idEmpresa
        }, {
            _id: true,
            nombreComercialEmpresa: true,
            descripcion: true,
            banner: true,
            calificacion: true,
            productosEmpresa: true
        })
        .then(result => {
            res.send(result);
            res.end()
        })
        .catch(error => {
            res.send(error);
            res.end();
        });
});

/* AGREGAR UNA NUEVA EMPRESA */
router.post('/', (req, res) => {
    console.log(req.body);
    let u = new empresas({
        nombreComercialEmpresa: req.body.nombreComercialEmpresa,
        RTN: req.body.RTN,
        direccion: req.body.direccion,
        logo: req.body.logo,
        banner: req.body.banner,
        descripcion: req.body.descripcion,
        telefonoContacto: req.body.telefonoContacto,
        estado: req.body.estado,
        productosEmpresa: req.body.productosEmpresa,
        categorias: req.body.categorias,
        calificacion: req.body.calificacion
    });
    console.log(u);
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
    empresas.update({
            _id: req.params.id
        }, {
            nombreComercialEmpresa: req.body.nombreComercialEmpresa,
            RTN: req.body.RTN,
            direccion: req.body.direccion,
            logo: req.body.logo,
            banner: req.body.banner,
            descripcion: req.body.descripcion,
            telefonoContacto: req.body.telefonoContacto,
            estado: req.body.estado,
            productosEmpresa: req.body.productosEmpresa,
            categorias: req.body.categorias,
            calificacion: req.body.calificacion
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

/* AGREGAR UNA NUEVA EMPRESA */
router.post('/:idEmpresa/productos', (req, res) => {
    let producto = new productos({
        _id: mongoose.Types.ObjectId(),
        nombreProducto: req.body.nombreProducto,
        imagenProducto: req.body.imagenProducto,
        imagenesCarrusel: req.body.imagenesCarrusel, //carrucel
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        estado: "Activo"
    });
    empresas.updateOne({
            _id: mongoose.Types.ObjectId(req.params.idEmpresa)
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

/* OBTENER LA INFORMACION DE UN PRODUCTO EN ESPECIFICO */
router.get('/:idEmpresa/producto/:idProducto', (req, res) => {
    empresas.find({
            _id: mongoose.Types.ObjectId(req.params.idEmpresa),
            "productosEmpresa._id": mongoose.Types.ObjectId(req.params.idProducto)
        }, {
            "productosEmpresa.$": true
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
router.put('/:idEmpresa/producto/:idProducto', (req, res) => {
    let producto = new productos({
        _id: mongoose.Types.ObjectId(),
        nombreProducto: req.body.nombreProducto,
        imagenProducto: req.body.imagenProducto,
        imagenesCarrusel: req.body.imagenesCarrusel, //carrucel
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        estado: req.body.estado
    });
    empresas.updateOne({
            _id: mongoose.Types.ObjectId(req.params.idEmpresa),
            "productosEmpresa._id": mongoose.Types.ObjectId(req.params.idProducto)
        }, {
            "productosEmpresa.$": producto
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
router.delete('/:idEmpresa/producto/:idProducto', (req, res) => {
    let producto = new productos({
        _id: mongoose.Types.ObjectId(),
        nombreProducto: req.body.nombreProducto,
        imagenProducto: req.body.imagenProducto,
        imagenesCarrusel: req.body.imagenesCarrusel, //carrucel
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        estado: "INACTIVO"
    });
    empresas.updateOne({
            _id: mongoose.Types.ObjectId(req.params.idEmpresa),
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