var mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

var PersonaScheme = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
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

router.delete('/borrar', (req, res) => {
PersonaScheme.remove({ _id:  req.body.id},function(err, result) {
  if (err) {
    console.err(err);
  } else {
    res.json(result);
  }
});  
});


module.exports = router;