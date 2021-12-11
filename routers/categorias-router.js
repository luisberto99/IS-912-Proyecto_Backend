var express = require('express');
var router = express.Router();
const data = require('../modules/database');



/* OBTENER TODAS LAS CATEGORIAS */
router.get('/', async(req, res) => {
    /* CONECCION A LA BASE DE DATOS */
    const db = await data.connectToDatabase();
    /* OBTENER COLLECION CATEGORIAS */
    const categorias = await db.collection('categorias');
    /* CONSULTA */
    result = await categorias.find().toArray();
    res.send(result)
    res.end()
});

/* OBTENER UNA CATEGORIA  */
router.get('/:idCategoria', async function(req, res) {

    /* CONECCION A LA BASE DE DATOS */
    const db = await data.connectToDatabase();
    /* OBTENER COLLECION CATEGORIAS */
    const categorias = await db.collection('categorias');
    /* CONSULTA */

    result = await categorias.find({
        _id: mongoose.Types.ObjectId(req.params.idCategoria)
    }).toArray();
    res.send(result[0])
    res.end()
});

/* AGREGAR UNA NUEVA CATEGORIA */
router.post('/', async(req, res) => {

    /* CONECCION A LA BASE DE DATOS */
    const db = await data.connectToDatabase();
    /* OBTENER COLLECION CATEGORIAS */
    const categorias = await db.collection('categorias');

    /* CONSULTA */
    let u = {
        nombreCategoria: req.body.nombreCategoria,
        icono: req.body.icono,
        img: req.body.img,
        color: req.body.color,
        fechaCreacion: new Date,
        estado: "ACTIVO"
    };

    result = await categorias.insertOne(u);
    res.send(result);
    res.end();
});

/* MODIFICAR UNA CATEGORIA */
router.put('/:idCategoria', async(req, res) => {

    /* CONECCION A LA BASE DE DATOS */
    const db = await data.connectToDatabase();
    /* OBTENER COLLECION CATEGORIAS */
    const categorias = await db.collection('categorias');

    /* CONSULTA */

    result = await categorias.updateOne({
        _id: mongoose.Types.ObjectId(req.params.idCategoria)
    }, {
        $set: {
            nombreCategoria: req.body.nombreCategoria,
            icono: req.body.icono,
            img: req.body.img,
            color: req.body.color
        }
    });
    res.send(result);
    res.end();
});

/* ELIMINAR UNA CATEGORIA */
router.delete('/:idCategoria', async(req, res) => {

    /* CONECCION A LA BASE DE DATOS */
    const db = await data.connectToDatabase();
    /* OBTENER COLLECION CATEGORIAS */
    const categorias = await db.collection('categorias');

    /* CONSULTA */
    result = await categorias.updateOne({
        _id: mongoose.Types.ObjectId(req.params.idCategoria)
    }, {
        $set: {
            estado: "INACTIVO"
        }
    });
    res.send(result);
    res.end();
});

/* OBTENER TODAS LAS EMPRESAS DENTRO DE UNA CATEGORIA */
router.get('/:idCategoria/empresas', async(req, res) => {

    /* CONECCION A LA BASE DE DATOS */
    const db = await data.connectToDatabase();
    /* OBTENER COLLECION CATEGORIAS */
    const empresas = await db.collection('empresas');

    /* CONSULTA */
    result = await empresas.find({
        categorias: req.params.idCategoria
    }, {}).toArray();
    res.send(result);
    res.end();
});

/* TODO AGREGAR UNA EMPRESA A UNA CATEGORIA */
/* TODO ELIMINAR UNA EMPRESA DE UNA CATEGORIA */
module.exports = router;