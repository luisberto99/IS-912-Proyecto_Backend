var express = require('express');
var router = express.Router();
var clientes = require('../models/clientes');
var mongoose = require('mongoose');


//Obtener clientes
router.get('/', function(req, res) {
    clientes.find({}, {
            password: false
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

/* AGREGAR UN NUEVO CLIENTE */
router.post('/', (req, res) => {
    let u = new clientes({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        imagenPerfil: req.body.imagenPerfil,
        correoElectronico: req.body.correoElectronico,
        fechaRegistro: new Date,
        password: req.body.password,
        telefono: req.body.telefono,
        ubicacion: req.body.ubicacion,
        carrito: [],
        ordenes: [],
        estado: "Activo"
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

//Obtener un cliente
router.get('/:idCliente', function(req, res) {
    clientes.find({
            _id: mongoose.Types.ObjectId(req.params.idCliente)
        }, {
            password: false
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

/* MODIFICAR UN CLIENTE */
router.put('/:idCliente', (req, res) => {
    clientes.updateOne({
            _id: mongoose.Types.ObjectId(req.params.idCliente)
        }, {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            imagenPerfil: req.body.imagenPerfil,
            correoElectronico: req.body.correoElectronico,
            fechaRegistro: new Date,
            password: req.body.password,
            telefono: req.body.telefono,
            ubicacion: req.body.ubicacion,
        }).then(result => {
            res.send(result);
            res.end();
        })
        .catch(error => {
            res.send(error);
            res.end();
        });
});

/* ELIMINAR UN CLIENTE - ESTADO INACTIVO */
router.delete('/:idCliente', (req, res) => {
    clientes.updateOne({
            _id: mongoose.Types.ObjectId(req.params.idCliente)
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