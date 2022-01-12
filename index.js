const express = require('express');
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require('cors');
var database = require('./modules/database');
var clientesRouter = require('./routers/clientes-router');
var EmpresasRouter = require('./routers/empresas-router');
var CategoriasRouter = require('./routers/categorias-router');
var OrdenesRouter = require('./routers/ordenes-router');
var MotoristasRouter = require('./routers/motoristas-router')
var ProductosRouter = require('./routers/productos-router')
var AdministradoresRouter = require('./routers/administradores-router')
var CarritoRouter = require('./routers/carrito-router');
var Charts = require('./routers/charts')
var asd = require('./routers/asd');

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use('/clientes', clientesRouter);
app.use('/empresas', EmpresasRouter);
app.use('/categorias', CategoriasRouter);
app.use('/ordenes', OrdenesRouter);
app.use('/motoristas', MotoristasRouter)
app.use('/productos', ProductosRouter);
app.use('/administracion', AdministradoresRouter);
app.use('/carrito', CarritoRouter)
app.use('/charts', Charts)
app.use('asd', asd)



app.get('/', (req, res) => {

    res.send("Bienvenido...");

});


app.listen(80, async() => {
    console.log('servidor inciado.');
});