var mongoose = require('mongoose');
var esquema = new mongoose.Schema({
    nombreCategoria: String,
    icono: String,
    img: String,
    color: String,
    fechaCreacion: Date,
    estado: String
});

module.exports = mongoose.model('categorias', esquema);