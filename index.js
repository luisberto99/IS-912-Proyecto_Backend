const express = require('express');
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require('cors');
var database = require('./modules/database');
var clientesRouter = require('./routers/clientes-router');


const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/clientes', clientesRouter);



app.get('/', (req, res) => {
    res.send('BIENVENIDO');
});


app.listen(3000, () => {
    console.log('servidor inciado.');
});