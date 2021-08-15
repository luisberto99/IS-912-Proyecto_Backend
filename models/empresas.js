var mongoose = require('mongoose');
var producto = require('./productos');

var esquema = new mongoose.Schema({
    nombreComercialEmpresa: String,
    RTN: String,
    direccion: String,
    logo: String,
    banner: String,
    descripcion: String,
    telefono: String,
    estado: String,
    productosEmpresa: Array,
    categorias: Array,
    calificacion: Number
});

module.exports = mongoose.model('empresas', esquema);