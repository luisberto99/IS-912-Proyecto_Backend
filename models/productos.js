var mongoose = require('mongoose');
var esquema = new mongoose.Schema({
    nombreProducto: String,
    imagenProducto: String,
    imagenesCarrusel: Array, //carrucel
    descripcion: String,
    precio: Number,
    estado: String
});

module.exports = mongoose.model('producto', esquema);