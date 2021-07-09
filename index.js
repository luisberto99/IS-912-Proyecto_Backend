const express = require('express');
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require('cors');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

//modulo necesario, para configurar la estrategia a utilizar.
const passportLocal = require('passport-local').Strategy;

const app = express();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
var users = [{
    nameUser:"lasb@gmail.com",
    password:"aaabbb",
},{
    nameUser:"lasddb@gmail.com",
    password:"6789",
},{
    nameUser:"luisb@gmail.com",
    password:"1234",
}]

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser('secretmY'));

app.use(session({
    secret: 'secretMy',
    resave: true,
    saveUninitialized: true
}));

//configuracion de inicio de sesion de passport
app.use(passport.initialize());
app.use(passport.session());


//implementando y configurando passport y la estrategia
passport.use( new passportLocal((username, password, done)=>{
    // console.log(username,password);
    //verificando un usuario
    if(username == 'luisBanegas@gmail.com' && password == '1234'){
        return done(null,{id:1,name:'Luis'});
    }

    done(null,false);
}));

passport.serializeUser((user,done)=>{
    //user viene el usuario que se retorno.
    console.log(user);
    done(null,user.id);
});


passport.deserializeUser((id,done)=>{
    console.log(id);
    done(null, {id:1,name:'Luis'});
});


app.post("/login", passport.authenticate("local",{
    successRedirect: "https://www.youtube.com/",
    failureRedirect: "/login"
    
}));


/* app.post("/login", (req, res)=>{

    user = {
        email: req.body.email,
        password: req.body.password
    }


    jwt.sign({user}, "keySecret", (e, token)=>{
        res.json({token});
    });
}); */

app.get('/', (req, res)=>{
    res.send('BIENVENIDO');
});

/* app.get('/',(req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}, (req,res)=>{
    //si ya iniciamos mostrar bienvenida.
    // const a;
    passport.deserializeUser((id,done)=>{
        console.log(id);
        // console.log(id);
        done(null, {id:1,name:'Luis'});
    });

    // console.log(a);
    res.send('BIENVENIDO');

    //si no hemos iniciado sesion redireccionar a login.

}); */

app.listen(3000, ()=>{
    console.log('servidor inciado.');
});

