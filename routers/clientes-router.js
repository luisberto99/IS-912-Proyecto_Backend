var express = require('express');
var router = express.Router();
var clientes = require('../models/clientes');
var mongoose = require('mongoose');


//Obtener clientes
router.get('/', function(req, res) {
    clientes.find({})
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


module.exports = router;