var mongoose = require('mongoose');
var esquema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    imagenPerfil: String,
    correoElectronico: String,
    fechaRegistro: Date,
    password: String,
    telefono: String,
    /*  */
    ubicacion: String,
    carrito: Array,
    ordenes: Array,
    estado: String
});

module.exports = mongoose.model('Cliente', esquema);