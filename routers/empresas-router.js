var express = require('express');
var router = express.Router();
var empresas = require('../models/empresas');
var mongoose = require('mongoose');


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
    let u = new empresa({
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
    empresas.update({
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

module.exports = router;