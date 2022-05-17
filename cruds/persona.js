var mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

var PersonaScheme = new mongoose.Schema({
  per_nombre: String,
  per_apellidos: String,
  per_edad: Number,
});

const Persona = mongoose.model('personas',PersonaScheme)

router.post('/agregar', (req, res)=> {
  const persona = new Persona({
      per_nombre:req.body.nombre,
      per_apellidos: req.body.apellidos,
      per_edad:req.body.edad
  })
  persona.save()
  .then(res =>{
      console.log(res);
  }).catch(err => console.log(err))
});

module.exports = router;