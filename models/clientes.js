var mongoose = require('mongoose');
var esquema = new mongoose.Schema({
    nombreCliente: String,
});

module.exports = mongoose.model('cliente', esquema);