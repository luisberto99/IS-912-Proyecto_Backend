var mongoose = require('mongoose');
var esquema = new mongoose.Schema({
    productoID: String,
    cantidad: Number,
    nota: String
});

module.exports = mongoose.model('ProductoCarrito', esquema);