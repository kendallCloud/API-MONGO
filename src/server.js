const sessions = require('express-session');
const cors =  require('cors');
const morgan = require('morgan');

const express = require('express');
const mongoose = require('mongoose');
// require("dotenv").config();
mongoose.connect('mongodb+srv://m001-student:m001-mongodb-basics@sandbox.1g67y.mongodb.net/TrackingUNA?authSource=admin&replicaSet=atlas-6y8290-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true').then(console.log("connection succesfull")).catch(err=>console.log(err))

const Persona = require('../cruds/persona')
const Departamento = require('../cruds/departamento')
const Tramite = require('../cruds/tramite')
const Caso = require('../cruds/caso')
const DetalleCaso = require('../cruds/detalleCaso')
const Gerencia = require('../cruds/gerencia')
const Documento = require('../cruds/documento')
const AprobadoXdepartamento = require('../cruds/aprobadoXdepartamento')
const JefeXdepartamento = require('../cruds/jefeXdepartamento')
const Parametro = require('../cruds/parametros')
const app = express();
const port= process.env.PORT || 4000;
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use('/api/persona',Persona);
app.use('/api/departamento',Departamento);
app.use('/api/tramite',Tramite);
app.use('/api/caso',Caso);
app.use('/api/detalleCaso',DetalleCaso);
app.use('/api/gerencia',Gerencia);
app.use('/api/documento',Documento);
app.use('/api/aprobadoXdepartamento',AprobadoXdepartamento);
app.use('/api/jefeXdepartamento',JefeXdepartamento);
app.use('/api/parametros',Parametro);

//routes

//POSTS
app.post('/G',(req, res)=>{
    mongoose.insert(req.body);
    console.log(JSON.stringify(req.body));
    res.send(`Esto es un post del  Nombre: ${req.body.nombre} ${req.body.apellido}`);
})

//Gets
var session;

const horas = 1000 * 60 * 60 * 2;
 app.use(sessions({
     secret: "secrctekeyfhrgfgrfrty84fwir767",
     saveUninitialized:true,
     cookie: { maxAge: horas },
     resave: false
 }));


app.get('/',function (req,res) {
    session=req.session;
    console.log(session);
    var json = {
      "hola":"Sesion iniciada"
    }
    console.log("Bienvenido al servidor "+req.query.name);
    req.session.name = 'cliente';
    res.send(json);
    console.log("sesion iniciada");
  });

  app.get('/logout',(req,res) => {
    var mensaje = new String("a cerrado sesion");
    var json = {
      "adios":mensaje
    }
    req.session.destroy(function(error){
        console.log("Session Destroyed")
    })
    console.log(mensaje);
    res.send(mensaje);
  });

//Getters
// app.get('/',(req,res) =>{
// res.send("hola");
// });
// app.get('/:id',(req,res) =>{
// res.send({"id": req.params.id, "nombre":"Dario"});
// });

// //DELETES
// app.delete('/:id',(req,res) => {
//     res.send(`Se ha eliminado el id -> ${req.params.id}`);
// })


app.listen(port, () => console.log('server listening on port',port));