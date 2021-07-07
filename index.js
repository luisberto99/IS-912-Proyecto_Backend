const express = require('express');
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require('cors');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors());


app.get('/', (req, res)=>{
    res.send('BIENVENIDO');
});


app.listen(3000, ()=>{
    console.log('servidor inciado.');
});