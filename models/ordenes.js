const mongoose = require('mongoose');

var esquema = new mongoose.Schema({
    ubicacionEntrega: String,
    nombreCliente: String,
    fechaOrden:String,  
    codigoVerificacion: String,
    _idEmpresaDistribuye: String,
    nombreEmpresaDistribuye: String,
    estadoOrden: String,
    _idMotorista:String,
    nombreMotorista:String,
    apellidoMotorista:String,
    impuestoOrden:String,
    comisionMotorista:String,
    totalCostoOrden:Number,
    coordenadasUbicacionOrden: Array, 
    informacionPago:Array,
    comisionAdministrador:String,
});


module.exports = mongoose.model('ordenes',esquema);