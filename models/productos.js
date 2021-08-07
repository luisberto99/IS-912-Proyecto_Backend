var mongoose = require('mongoose');
var esquema = new mongoose.Schema({
    nombreProducto: String,
    imagenProducto: String,
    imagenesCarrusel: Array, //carrucel
    descripcion: String,
    precio: Number
});

module.exports = mongoose.model('producto', esquema);