var express = require('express');
var router = express.Router();
var categorias = require('../models/categorias');
var empresas = require('../models/empresas');
var mongoose = require('mongoose');

/* OBTENER TODAS LAS CATEGORIAS */
router.get('/', function(req, res) {
    categorias.find({})
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

/* OBTENER UNA CATEGORIA  */
router.get('/:idCategoria', function(req, res) {
    categorias.find({
            _id: mongoose.Types.ObjectId(req.params.idCategoria)
        })
        .then(result => {
            res.send(result[0]);
            res.end();
        })
        .catch(error => {
            console.log('error');
            res.send(error);
            res.end();
        });
});

/* AGREGAR UNA NUEVA CATEGORIA */
router.post('/', (req, res) => {
    let u = new categorias({
        nombreCategoria: req.body.nombreCategoria,
        icono: req.body.icono,
        img: req.body.img,
        color: req.body.color,
        fechaCreacion: new Date,
        estado: "ACTIVO"
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

/* MODIFICAR UNA CATEGORIA */
router.put('/:idCategoria', (req, res) => {
    categorias.updateOne({
            _id: mongoose.Types.ObjectId(req.params.idCategoria)
        }, {
            nombreCategoria: req.body.nombreCategoria,
            icono: req.body.icono,
            img: req.body.img,
            color: req.body.color
        }).then(result => {
            res.send(result);
            res.end();
        })
        .catch(error => {
            res.send(error);
            res.end();
        });
});

/* ELIMINAR UNA CATEGORIA */
router.delete('/:idCategoria', (req, res) => {
    categorias.updateOne({
            _id: mongoose.Types.ObjectId(req.params.idCategoria)
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

/* OBTENER TODAS LAS EMPRESAS DENTRO DE UNA CATEGORIA */
router.get('/:idCategoria/empresas', (req, res) => {
    empresas.find({
            categorias: req.params.idCategoria
        }, {}).then(result => {
            res.send(result);
            res.end();
        })
        .catch(error => {
            res.send(error);
            res.end();
        });
});

/* TODO AGREGAR UNA EMPRESA A UNA CATEGORIA */
/* TODO ELIMINAR UNA EMPRESA DE UNA CATEGORIA */
module.exports = router;