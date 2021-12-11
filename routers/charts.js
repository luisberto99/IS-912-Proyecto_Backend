var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const data = require('../modules/database');


/* CANTIDAD DE ORDENES POR CLIENTE */
router.get('/ordenesPorCliente', async(req, res) => {
    /* CONECCION A LA BASE DE DATOS */
    const db = await data.connectToDatabase();
    /* OBTENER COLLECION ORDENES */
    const ordenes = await db.collection('ordenes');
    /* CONSULTA */
    result = await ordenes.aggregate([{
            $unwind: '$_idCliente'
        },
        {
            $sortByCount: '$_idCliente'
        }
    ]);

    res.send(result);
    res.end();
});

router.get('/ordenesPorEmpresa', async(req, res) => {
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