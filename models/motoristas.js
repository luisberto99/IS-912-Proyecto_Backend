const mongoose = require('mongoose');

var esquema = new mongoose.Schema({
    primerNombre:String,
    primerApellido:String,
    numeroIdentidad:String,
    numeroTelefono:Number,
    email:String,
    password:String,
    domicilio:String,
    imagenPerfil:String,
    motoristaDisponible:Boolean,
    estadoVerificacionMotorista: Boolean,
    verificado: Array,
    ordenesEntregadas: Array,
    ordenTomadaActualmente:Array,
});

module.exports = mongoose.model('motoristas',esquema);