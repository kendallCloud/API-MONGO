const express = require('express');
const mongoose = require('mongoose');
// require("dotenv").config();
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
