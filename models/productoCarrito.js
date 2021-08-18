var mongoose = require('mongoose');
var esquema = new mongoose.Schema({
    productoID: String,
    unidades: Number,
    precio: Number,
    nota: String
});

module.exports = mongoose.model('ProductoCarrito', esquema);