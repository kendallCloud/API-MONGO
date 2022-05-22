var mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

var PersonaScheme = new mongoose.Schema({
  // _id: mongoose.Types.ObjectId,
  per_codigo: String,
  per_nombre: String,
  per_apellidos: String,
  per_edad: Number,
});

const Persona = mongoose.model('personas',PersonaScheme)

router.post('/agregar', (req, res)=> {
  const persona = new Persona({
      per_codigo:req.body.codigo,
      per_nombre:req.body.nombre,
      per_apellidos: req.body.apellidos,
      per_edad:req.body.edad
  })
  persona.save()
  .then(res =>{
      console.log(res);
  }).catch(err => console.log(err))
});

router.delete('/borrar', (req, res) => {
  Persona.findOneAndDelete({per_codigo: req.body.codigo }, function (err, docs) {
    if (err){
        console.log(err)
    }
    else{
        console.log("Deleted User : ", docs);
    }
  });
});

router.put('/editar', (req, res) => {
    Persona.findOneAndUpdate({per_codigo: req.body.codigo }, 
      {per_nombre:req.body.nombre, per_apellidos: req.body.apellidos, per_edad:req.body.edad},
      function (err, docs) {
      if (err){
          console.log(err)
      }
      else{
          console.log("Original Doc : ",docs);
      }
    });
});

router.get('/per', (req, res) => {
    Persona.findOne({per_codigo: req.body.codigo}, function (err, docs) {
      if (err){
          console.log(err)
      }
      else{
          console.log("Result : ", docs);
      }
    });
});

router.get("/all",function(req, res) {
  Persona.find({}, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});
module.exports = router;