var express = require('express');
var router = express.Router();
var categorias = require('../models/categorias');
var empresas = require('../models/empresas');
var mongoose = require('mongoose');
var ordenes = require('../models/ordenes');


/* CANTIDAD DE ORDENES POR CLIENTE */
router.get('/ordenesPorCliente', (req, res) => {
    ordenes.aggregate([{
                $unwind: '$_idCliente'
            },
            {
                $sortByCount: '$_idCliente'
            }
        ]).then(result => {
            res.send(result);
            res.end();
        })
        .catch(error => {
            res.send(error);
            res.end();
        });
});

router.get('/ordenesPorEmpresa', (req, res) => {
    ordenes.aggregate([{
                $unwind: '$nombreEmpresaDistribuye'
            },
            {
                $sortByCount: '$nombreEmpresaDistribuye'
            }
        ]).then(result => {
            res.send(result);
            res.end();
        })
        .catch(error => {
            res.send(error);
            res.end();
        });
});


module.exports = router;