var mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

var DepartamentoScheme = new mongoose.Schema({
    // _id: mongoose.Types.ObjectId,
    dep_codigo: String,
    dep_nombre: String,
  });

  const Departamento = mongoose.model('departamentos',DepartamentoScheme)

router.post('/agregar', (req, res)=> {
  const departamento = new Departamento({
     dep_codigo:req.body.codigo,
     dep_nombre:req.body.nombre,
  })
  departamento.save()
  .then(res =>{
      console.log(res);
  }).catch(err => console.log(err))
});

router.delete('/borrar', (req, res) => {
  Departamento.findOneAndDelete({dep_codigo: req.body.codigo }, function (err, docs) {
    if (err){
        console.log(err)
    }
    else{
        console.log("Deleted User : ", docs);
    }
  });
});

router.put('/editar', (req, res) => {
    Departamento.findOneAndUpdate({dep_codigo: req.body.codigo }, 
      {dep_nombre:req.body.nombre},
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