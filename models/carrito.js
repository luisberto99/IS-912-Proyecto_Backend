var mongoose = require('mongoose');
var esquema = new mongoose.Schema({
    productos: Array
});

module.exports = mongoose.model('Carrito', esquema);