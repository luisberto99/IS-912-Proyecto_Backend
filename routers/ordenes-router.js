const express = require('express');
const router = express.Router();
const ordenes = require('../models/ordenes.js')
const mongoose = require('mongoose');



/* OBTENER TODAS LAS ORDENES DISPONIBLES*/
router.get('/disponibles', (req, res) => {
    ordenes.find({ estadoOrden: 'Disponible' }).then(result => {
        res.send(JSON.stringify(result));
        // console.log(result);
        res.end();

    }).catch(e => {
        res.send(e);
        res.end();
    })
});

/* OBTENER TODAS LAS ORDENES*/
router.get('/', (req, res) => {
    ordenes.find().then(result => {
        res.send(result);
        res.end();

    }).catch(e => {
        res.send(e);
        res.end();
    })
});


/* OBTENER TODAS LAS ORDENES TOMADAS*/
router.get('/tomadas', (req, res) => {
    ordenes.find({ estadoOrden: 'Tomada' }).then(result => {
        res.send(result);
        //console.log(result);
        res.end();

    }).catch(e => {
        res.send(e);
        res.end();
    })
});

/* OBTENER TODAS LAS ORDENES DE UN CLIENTE */
router.get('/cliente/:idCliente', (req, res) => {
    ordenes.find({
        _idCliente: mongoose.Types.ObjectId(req.params.idCliente)
    }).sort({
        _id: -1
    }).then(result => {
        res.send(result);
        res.end();
    }).catch(e => {
        res.send(e);
        res.end();
    })
});

/* ACTUALIZAR EL ESTADO DE UNA ORDEN */
router.put('/updateOrden', (req, res) => {
    // console.log('siuu',req.body.idOrden,req.body.estado);
    ordenes.updateOne({ _id: req.body.idOrden }, { $set: { estadoOrden: `${req.body.estado}` } }).then(result => {
        res.send({ result })
        res.end();
    })
});

/* OBTENER ORDEN EN ESPECIFICO*/
router.get('/obtenerOrden/:idOrden', (req, res) => {

    ordenes.find({ _id: req.params.idOrden }).then(result => {
        res.send(result[0]);
        res.end();
    }).catch(e => {
        res.send(e);
        res.end()
    });
})

/* VERIFICAR SI UN MOTORISTA CUENTA CON UNA ORDEN TOMADA. FALSE=NO TIENE, TRUE=TIENE*/
router.get('/verifyOrden/:idMotorista', (req, res) => {

    ordenes.find({ _idMotorista: req.params.idMotorista }).then(result => {
        if (result.length < 1) {
            res.send({ result: false });
            res.end();
        } else {
            res.send({ result: true });
            res.end();
        }
    }).catch(e => {
        res.send(e);
        res.end();
    });
})


/* OBTENER ORDEN TOMADA ACTUALMENTE POR EL MOTORISTA */
router.get('/ordenTomadaMotorista/:idMotorista', (req, res) => {

    ordenes.find({ _idMotorista: req.params.idMotorista }).then(orden => {
        if (orden.length < 1) {
            res.send({ result: false });
            res.end();
        } else {
            let status = false;
            for (let i = 0; i < orden.length; i++) {
                if (orden[i].estadoOrden == "Tomada") {
                    res.send(orden[i]);
                    res.end();
                    status = true;
                }
            }
            if (status == false) {

                res.send({ result: false });
                res.end();
            }
        }
    }).catch(e => {
        res.send(e);
        res.end();
    });
})

/* OBTENER LAS ORDENES ENTREGAS POR EL MOTORISTA */
router.get('/ordenesEntregadas/:idMotorista', (req, res) => {

    ordenes.find({ _idMotorista: req.params.idMotorista, estadoOrden: 'Entregada' }).then(ordenes => {
        res.send(ordenes);
        res.end();
    }).catch(e => {
        res.send(e);
        res.end();
    });
})

/* ASIGNAR MOTORISTA A ORDEN */
router.put('/asignarMotorista', (req, res) => {
    ordenes.updateOne({ _id: req.body.orden.idOrden }, {
        estadoOrden: "Tomada",
        _idMotorista: req.body.orden.idMotorista,
        nombreMotorista: req.body.orden.nombreMotorista,
        apellidoMotorista: req.body.orden.apellido
    }).then(result => {
        res.send({ result: true })
        res.end();

    }).catch(e => {
        res.send({ result: false });
        res.end();

    })

})


/* CREAR NUEVA ORDEN */

router.post("/nuevaOrden", (req, res) => {
    ordenes.create({
        nombreCliente: req.body.orden.nombreCliente,
        _idCliente: req.body.orden._idCliente,
        ubicacionEntrega: req.body.orden.ubicacionEntrega,
        fechaOrden: req.body.orden.fechaOrden,
        _idEmpresaDistribuye: req.body.orden._idEmpresaDistribuye,
        nombreEmpresaDistribuye: req.body.orden.nombreEmpresaDistribuye,
        productosOrden: req.body.orden.productosOrden,
        estadoOrden: "Disponible",
        impuestoOrden: req.body.orden.impuestoOrden,
        comisionMotorista: req.body.orden.comisionMotorista,
        totalCostoOrden: req.body.orden.totalCostoOrden,
        coordenadasUbicacionOrden: req.body.orden.coordenadasUbicacionOrden,
        infoPago: req.body.orden.infoPago,
        /*         "informacionPago.ultimosDigitosTargeta": req.body.orden.digitosTargeta,
                "informacionPago.mesVencimiento": req.body.orden.mesVence,
                "informacionPago.anoVencimiento": req.body.orden.anoVence,
                "informacionPago.nombrePropietario": req.body.orden.nombrePropietario,
                "informacionPago.numeroAutorizacionPago": req.body.orden.numAutorizacionPago, */
        comisionAdministrador: req.body.orden.comisionAdministrador

    }).then(result => {

        res.send(result);
        res.end();

    }).catch(e => {
        res.send({ result: false });
        res.end();
    });
});

/* AGREGAR PRODUCTOS A ORDEN */
router.put("/agregarProductos", (req, res) => {

    let product = req.body.orden.products

    ordenes.updateOne({ _id: req.body.orden.idOrden }, {
        $push: { productosOrden: product }
    }).then(result => {

        res.send(result);
        res.end();

    }).catch(e => {
        res.send({ result: false });
        res.end();
    })

});


/* AGREGAR PRODUCTO A ORDEN */
router.put("/agregarProducto", (req, res) => {

    ordenes.updateOne({ _id: req.body.orden.idOrden }, {
        $push: {
            productosOrden: {
                nombreProducto: req.body.orden.nombreProduct,
                cantidad: req.body.orden.cantidad,
                precio: req.body.orden.precio,
                nota: req.body.orden.nota
            }
        }
    }).then(result => {
        res.send(result);
        res.end();

    }).catch(e => {
        res.send({ result: false });
        res.end();
    })
});

/* VERIFICAR SI MOTORISTA TIENE ACTUALMENTE UNA ORDEN TOMADA. */

router.get("/:idMotorista/verificarOrdenMotorista", (req, res) => {

    ordenes.find({ _idMotorista: req.params.idMotorista }, { estadoOrden: true }).then(result => {
        let estado = true;
        result.forEach(orden => {
            if (orden.estadoOrden == "Tomada") {
                res.send({ result: true });
                res.end();
                estado = false;
            }
        });

        if (estado) {
            res.send({ result: false });
            res.end();
        }

    }).catch(e => {
        res.send({ result: false });
        res.end();
    })

})

module.exports = router;