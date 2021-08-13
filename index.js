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
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/clientes', clientesRouter);
app.use('/empresas', EmpresasRouter);
app.use('/categorias', CategoriasRouter);
app.use('/ordenes', OrdenesRouter);
app.use('/motoristas',MotoristasRouter)

app.get('/', (req, res) => {
    
    res.send("Bienvenido...");

});


app.listen(3000, () => {
    console.log('servidor inciado.');
});