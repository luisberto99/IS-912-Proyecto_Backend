const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
var CryptoJS = require("crypto-js");

const data = require('../modules/database');

/* APIS MOTORISTAS */

/* OBTENER TODOS LOS MOTORISTAS VERIFICADOS */
router.get('/verificados', async(req, res) => {
    /* CONECCION A LA BASE DE DATOS */
    const db = await data.connectToDatabase();
    /* OBTENER COLLECION MOTORISTAS */
    const motoristas = await db.collection('motoristas');
    /* CONSULTA */
    result = await motoristas.find({
        estadoVerificacionMotorista: true
    }).toArray();

    res.send(result);
    res.end();

});


/* OBTENER LOS MOTORISTAS AUN FALTANTES POR VERIFICAR */

router.get('/faltanVerificar', async(req, res) => {
    /* CONECCION A LA BASE DE DATOS */
    const db = await data.connectToDatabase();
    /* OBTENER COLLECION MOTORISTAS */
    const motoristas = await db.collection('motoristas');
    /* CONSULTA */
    result = await motoristas.find({
        estadoVerificacionMotorista: false
    }).toArray();

    res.send(result);
    res.end();

});


/* CREAR NUEVO MOTORISTA */


router.post('/registrar', async(req, res) => {
    /* CONECCION A LA BASE DE DATOS */
    const db = await data.connectToDatabase();
    /* OBTENER COLLECION MOTORISTAS */
    const motoristas = await db.collection('motoristas');
    /* CONSULTA */

    let emails = await motoristas.find({}, { email: true }).toArray();

    emails.forEach(user => {
        // console.log(user);
        let bytes = CryptoJS.AES.decrypt(user.email, 'secretKeyDW2021***');
        let emailDescript = bytes.toString(CryptoJS.enc.Utf8);

        emails.push(emailDescript);
    });
    // console.log(emails);

    if (!(emails.includes(req.body.email))) {
        let emailCrypto = CryptoJS.AES.encrypt(req.body.email, 'secretKeyDW2021***').toString();
        let passCrypto = CryptoJS.AES.encrypt(req.body.password, 'secretKeyDW2021***').toString();

        result = await motoristas.insertOne({
            primerNombre: req.body.primerNombre,
            primerApellido: req.body.primerApellido,
            numeroIdentidad: req.body.identidad,
            numeroTelefono: req.body.telefono,
            email: emailCrypto,
            password: passCrypto,
            domicilio: req.body.domicilio,
            estadoVerificacionMotorista: false,
            estadoParaEntregarOrdenes: 'Desconectado',
            imagenPerfil: ""
        });

        res.send(result);
        res.end();

    };
});


/* CAMBIAR ESTADO DEL MOTORISTA A VERIFICADO, DESDE ADMINISTRACION */

router.put('/:idMotorista/verificar', async(req, res) => {
    /* CONECCION A LA BASE DE DATOS */
    const db = await data.connectToDatabase();
    /* OBTENER COLLECION MOTORISTAS */
    const motoristas = await db.collection('motoristas');
    /* CONSULTA */
    result = await motoristas.updateOne({
        _id: req.params.idMotorista
    }, {
        $push: {
            RegistroVerificacionCuenta: {
                nombre: req.body.nombreAdmin,
                apellido: req.body.apellidoAdmin,
                _idAdministrador: mongoose.Types.ObjectId(req.body.idAdmin)
            }
        },
        estadoVerificacionMotorista: true
    });


    res.send(result);
    res.end();


});



/* API PARA VERIFICAR SI LA CUENTA DE UN MOTORISTA EXISTE. */

router.get('/obtenerDatos/:email', async(req, res) => {
    /* CONECCION A LA BASE DE DATOS */
    const db = await data.connectToDatabase();
    /* OBTENER COLLECION MOTORISTAS */
    const motoristas = await db.collection('motoristas');
    /* CONSULTA */
    mail = await motoristas.find({}, {
        email: true
    }).toArray();

    let emails = [];

    mail.forEach(user => {
        // console.log(user);
        let bytes = CryptoJS.AES.decrypt(user.email, 'secretKeyDW2021***');
        let emailDescript = bytes.toString(CryptoJS.enc.Utf8);

        emails.push(emailDescript);
    });

    if (emails.includes(req.params.email)) {
        res.send(true);
        res.end();

    } else {
        res.send(false);
        res.end();
    }

    // motoristas.findOne({email:req.params.email}).then(result =>{
    //     //     res.send({result:result.password, idUser: result._id});
    //     //     res.end();

    //     // }).catch(e =>{
    //     //     res.send({result:false});
    //     //     res.end();
    // })

});



/* AGREGAR IMAGEN A PERFIL MOTORISTA */

router.post('/newImage', async(req, res) => {
    /* CONECCION A LA BASE DE DATOS */
    const db = await data.connectToDatabase();
    /* OBTENER COLLECION MOTORISTAS */
    const motoristas = await db.collection('motoristas');
    /* CONSULTA */
    resutl = await motoristas.updateOne({
        _id: req.body.idUser
    }, {
        $set: {
            imagenPerfil: req.body.imagen
        }
    });


    res.send(result);
    res.end();

});

/* API PARA OBTENER IMAGEN DEL PERFIL DEL MOTORISTA */

router.get('/obtenerImagenPerfil/:idUser', async(req, res) => {
    /* CONECCION A LA BASE DE DATOS */
    const db = await data.connectToDatabase();
    /* OBTENER COLLECION MOTORISTAS */
    const motoristas = await db.collection('motoristas');
    /* CONSULTA */
    motoristas.findOne({
        _id: req.params.idUser
    }, { imagenPerfil: true })


    res.send(result);
    res.end();

});

/* LOGIN MOTORISTA */

router.post('/login', async(req, res) => {
    /* CONECCION A LA BASE DE DATOS */
    const db = await data.connectToDatabase();
    /* OBTENER COLLECION MOTORISTAS */
    const motoristas = await db.collection('motoristas');
    /* CONSULTA */
    users = await motoristas.find({}, {
        email: true,
        password: true
    }).toArray();


    let verify = true;
    userts.forEach(user => {
        // console.log(user);

        let bytes = CryptoJS.AES.decrypt(user.email, 'secretKeyDW2021***');
        let emailDecrypt = bytes.toString(CryptoJS.enc.Utf8);

        let bytesPass = CryptoJS.AES.decrypt(user.password, 'secretKeyDW2021***');
        let passDecrypt = bytesPass.toString(CryptoJS.enc.Utf8);
        // console.log(emailDecrypt,passDecrypt);
        if (req.body.password == passDecrypt && req.body.email == emailDecrypt) {
            res.send({ result: true, id: user._id });
            res.end();
            verify = false
        }

    });
    if (verify) {
        res.send({ result: false });
        res.end();
    }
});


/* CONFIGURACION PERFIL USUARIO, ACTUALIZAR CORREO MOTORISTA */

router.put("/configuracion/cambiarCorreo", async(req, res) => {
    /* CONECCION A LA BASE DE DATOS */
    const db = await data.connectToDatabase();
    /* OBTENER COLLECION MOTORISTAS */
    const motoristas = await db.collection('motoristas');
    /* CONSULTA */
    // console.log(req.body.email,req.body.idUser);
    let emailEncrypt = CryptoJS.AES.encrypt(req.body.email, 'secretKeyDW2021***').toString();

    result = await motoristas.updateOne({
        _id: req.body.idUser
    }, {
        $set: {
            email: emailEncrypt
        }
    });

    res.send(result);
    res.end();

});

/* OBTENER MOTORISTA APARTIR DE SU _ID */

router.get("/obtenerMotorista/:idMotorista", async(req, res) => {
    /* CONECCION A LA BASE DE DATOS */
    const db = await data.connectToDatabase();
    /* OBTENER COLLECION MOTORISTAS */
    const motoristas = await db.collection('motoristas');
    /* CONSULTA */
    result = await motoristas.find({
        _id: req.params.idMotorista
    }, {
        primerNombre: true,
        primerApellido: true,
        domicilio: true,

        email: true
    }).toArray();

    let datosMotorista = result[0];
    let emailMotorista = result[0].email;

    let bytes = CryptoJS.AES.decrypt(emailMotorista, 'secretKeyDW2021***');
    let emailDecrypt = bytes.toString(CryptoJS.enc.Utf8)
    datosMotorista.email = emailDecrypt;
    res.send(datosMotorista);
    res.end();
});

/* ACTUALIZAR PASSWORD MOTORISTA */

router.put("/nuevaContrasena", async(req, res) => {
    /* CONECCION A LA BASE DE DATOS */
    const db = await data.connectToDatabase();
    /* OBTENER COLLECION MOTORISTAS */
    const motoristas = await db.collection('motoristas');
    /* CONSULTA */
    motorista = await motoristas.find({
        _id: req.body.idBiker
    }, {
        $set: {
            password: true
        }
    });

    let bytesPass = CryptoJS.AES.decrypt(motorista[0].password, 'secretKeyDW2021***');
    let passDecrypt = bytesPass.toString(CryptoJS.enc.Utf8);
    // console.log(passDecrypt);
    if (passDecrypt == req.body.password) {

        let passEncrypt = CryptoJS.AES.encrypt(req.body.newPassword, 'secretKeyDW2021***').toString();

        result = await motoristas.updateOne({
            _id: req.body.idBiker
        }, {
            password: passEncrypt
        })
        res.send(result);
        res.end();

    } else {

        res.send({ result: false });
        res.end();
    }
});

/* OBTENER MOTORISTAS DISPONIBLES Y ACTIVOS PARA TRABAJAR */

router.get("/disponibles", async(req, res) => {
    /* CONECCION A LA BASE DE DATOS */
    const db = await data.connectToDatabase();
    /* OBTENER COLLECION MOTORISTAS */
    const motoristas = await db.collection('motoristas');
    /* CONSULTA */
    result = await motoristas.find({
        estadoParaEntregarOrdenes: 'Disponible'
    }, {
        primerNombre: true,
        primerApellido: true,
        imagenPerfil: true
    }).toArray();
    res.send(result);
    res.end();
});

/* VERFICAR SI EL MOTORISTA ESTA VERIFICADO POR LOS ADMINISTRADORES. */

router.get('/:idMotorista/estadoVeficado', async(req, res) => {
    /* CONECCION A LA BASE DE DATOS */
    const db = await data.connectToDatabase();
    /* OBTENER COLLECION MOTORISTAS */
    const motoristas = await db.collection('motoristas');
    /* CONSULTA */
    result = await motoristas.find({
        _id: req.params.idMotorista
    }, {
        estadoVerificacionMotorista: true
    }).toArray();

    if (result[0].estadoVerificacionMotorista) {

        res.send({ result: true });
        res.end();
    } else {
        res.send({ result: false });
        res.end();
    }
});

/* CAMBIAR ESTADO DE MOTORISTA A ACTIVO, EN PROCESO DE ENTREGA  O DESCONECTADO. */

router.put('/actualizarEstadoo', async(req, res) => {
    /* CONECCION A LA BASE DE DATOS */
    const db = await data.connectToDatabase();
    /* OBTENER COLLECION MOTORISTAS */
    const motoristas = await db.collection('motoristas');
    /* CONSULTA */
    // console.log(req.body.id,req.body.estado);
    result = await motoristas.updateOne({
        _id: req.body.id
    }, {
        $set: {
            estadoParaEntregarOrdenes: req.body.estado
        }
    });

    res.send({ result: true });
    res.end();
});

module.exports = router;