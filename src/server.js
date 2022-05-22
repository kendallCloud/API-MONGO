const express = require('express');
const mongoose = require('mongoose');
// require("dotenv").config();
mongoose.connect('mongodb+srv://m001-student:m001-mongodb-basics@sandbox.1g67y.mongodb.net/TrackingUNA?authSource=admin&replicaSet=atlas-6y8290-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true').then(console.log("connection succesfull")).catch(err=>console.log(err))

const Persona = require('../cruds/persona')
const app = express();
const port= process.env.PORT || 4000;
app.use(express.json());
app.use('/persona',Persona)
//routes
//Getters
// app.get('/',(req,res) =>{
// res.send("hola");
// });
// app.get('/:id',(req,res) =>{
// res.send({"id": req.params.id, "nombre":"Dario"});
// });

//POSTS
app.post('/G',(req, res)=>{
    mongoose.insert(req.body);
    console.log(JSON.stringify(req.body));
    res.send(`Esto es un post del  Nombre: ${req.body.nombre} ${req.body.apellido}`);

})

// //DELETES
// app.delete('/:id',(req,res) => {
//     res.send(`Se ha eliminado el id -> ${req.params.id}`);
// })


app.listen(port, () => console.log('server listening on port',port));
