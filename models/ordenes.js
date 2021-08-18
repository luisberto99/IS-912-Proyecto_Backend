const mongoose = require('mongoose');

var esquema = new mongoose.Schema({
    ubicacionEntrega: String,
    nombreCliente: String,
    fechaOrden:String,  
    _idEmpresaDistribuye: String,
    nombreEmpresaDistribuye: String,
    estadoOrden: String,
    productosOrden:Array,
    _idMotorista:String,
    nombreMotorista:String,
    apellidoMotorista:String,
    impuestoOrden:Number,
    comisionMotorista:Number,
    totalCostoOrden:Number,
    coordenadasUbicacionOrden: String, 
    informacionPago: mongoose.Schema.Types.Mixed,
    comisionAdministrador:String,
});


module.exports = mongoose.model('ordenes',esquema);