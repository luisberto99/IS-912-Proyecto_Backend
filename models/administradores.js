var mongoose = require('mongoose');
var esquema = new mongoose.Schema({
    primerNombre: String,
    primerApellido: String,
    password: String,
    email: String,
});

module.exports = mongoose.model('administradores', esquema);