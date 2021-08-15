const mongoose = require('mongoose');

var esquema = new mongoose.Schema({
    primerNombre:String,
    primerApellido:String,
    numeroIdentidad:Number,
    numeroTelefono:Number,
    email:String,
    password:String,
    domicilio:String,
    imagenPerfil:String,
    estadoVerificacionMotorista: Boolean,
    RegistroVerificacionCuenta: Array,
    ordenesEntregadas: Array,
    ordenTomadaActualmente:Array,
});

module.exports = mongoose.model('motoristas',esquema);