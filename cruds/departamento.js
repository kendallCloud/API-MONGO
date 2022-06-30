var mongoose = require('mongoose');
const express = require('express');
const { request } = require('express');
const router = express.Router();

var DepartamentoScheme = new mongoose.Schema({
    // _id: mongoose.Types.ObjectId,
    //dep_codigo: String,
    dep_nombre: String,
    dep_cantidadEmpleados:Number,
    dep_telefono: String,
    dep_email: String,
    //dep_jefe: 
    //dep_gerencia
  });

  const Departamento = mongoose.model('departamentos',DepartamentoScheme)

router.post('/agregar', (req, res)=> {
 // var dpto=req.body.departamentos;
 // for(i=0;i<dpto.l;){
    
//  }
  const departamento = new Departamento({
    // dep_codigo:req.body.codigo,
     dep_nombre:req.body.dep_nombre,
     dep_cantidadEmpleados:req.body.dep_cantidadEmpleados,
     dep_telefono:req.body.dep_telefono,
     dep_email:req.body.dep_email,
  })
  departamento.save()
  .then(res =>{
      console.log(res);
  }).catch(err => console.log(err))
});

router.delete('/borrar', (req, res) => { // cambiar por id*
  console.log(req.body.id);
  Departamento.findOneAndDelete({_id: req.body.id}, function (err, docs) {// cambiar por id*
    if (err){
        console.log(err)
    }
    else{
        console.log("Deleted User : ", docs);
    }
  });
});

router.put('/editar', (req, res) => {    // cambiar por id
    Departamento.findOneAndUpdate({dep_codigo: req.body.codigo }, // cambiar por id*
      {dep_nombre:req.body.nombre,
      dep_cantidadEmpleados:req.body.cantEmpleados,
      dep_telefono:req.body.telefono,
      dep_email:req.body.email},
      function (err, docs) {
      if (err){
          console.log(err)
      }
      else{
          console.log("Original Doc : ",docs);
      }
    });
});

router.get('/per', (req, res) => {// cambiar por id*
    Departamento.findOne({dep_codigo: req.body.codigo}, function (err, docs) {
      if (err){
          console.log(err)
      }
      else{
          console.log("Result : ", docs);
      }
    });
});

router.get("/all",function(req, res) {
  Departamento.find({}, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});
module.exports = router;