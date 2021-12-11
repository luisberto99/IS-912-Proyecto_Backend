const express = require('express');
const router = express.Router();
const CryptoJS = require("crypto-js");
const data = require('../modules/database');


/* CREACION DE CUENTA ADMINISTRADOR Y ENCRIPTACION DE LA INFORMACION */
router.post('/createNewUser', async(req, res) => {

    /* CONECCION A LA BASE DE DATOS */
    const db = await data.connectToDatabase();
    /* OBTENER COLLECION ADMINISTRADORES */
    const administradores = await db.collection('administradores');

    /* CONSULTA */
    let emailCrypto = CryptoJS.AES.encrypt(req.body.email, 'secretKeyDW2021***').toString();
    let passCrypto = CryptoJS.AES.encrypt(req.body.password, 'secretKeyDW2021***').toString();
    result = await administradores.insertOne({
        primerNombre: req.body.name,
        primerApellido: req.body.fullName,
        password: passCrypto,
        email: emailCrypto
    });
    res.send(result);
    res.end();
});

/* LOGIN ADMIN */

router.post('/login', async(req, res) => {

    /* CONECCION A LA BASE DE DATOS */
    const db = await data.connectToDatabase();
    /* OBTENER COLLECION ADMINISTRADORES */
    const administradores = await db.collection('administradores');

    /* CONSULTA */

    users = await administradores.find({}, { email: true, password: true }).toArray();
    let state = true;

    for (let i = 0; i < users.length; i++) {
        let bytes = CryptoJS.AES.decrypt(users[i].email, 'secretKeyDW2021***');
        let emailDecrypt = bytes.toString(CryptoJS.enc.Utf8);

        let bytesPass = CryptoJS.AES.decrypt(users[i].password, 'secretKeyDW2021***');
        let passDescript = bytesPass.toString(CryptoJS.enc.Utf8);

        console.log(passDescript, emailDecrypt);
        if (passDescript == req.body.password && emailDecrypt == req.body.email) {

            res.send({ result: true, id: users[i]._id });
            res.end();
            state = false;

        }
    }

    if (state) {
        res.send({ result: false })
        res.end();
    }

});

/* OBTENER NOMBRE Y APELLIDO ADMIN */

router.get("/:idAdmin/datos", async(req, res) => {

    /* CONECCION A LA BASE DE DATOS */
    const db = await data.connectToDatabase();
    /* OBTENER COLLECION ADMINISTRADORES */
    const administradores = await db.collection('administradores');

    /* CONSULTA */

    result = await administradores.find({
        _id: req.params.idAdmin
    }, {
        primerNombre: true,
        primerApellido: true
    }).toArray();

    res.send(result[0]);
    res.end();

})
module.exports = router;