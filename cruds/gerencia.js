var mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

var GerenciaScheme = new mongoose.Schema({
    // _id: mongoose.Types.ObjectId,
    ger_codigo: String,
    ger_dpto_cod: String,
  });

  const Gerencia = mongoose.model('gerencias',GerenciaScheme)

router.post('/agregar', (req, res)=> {
  const gerencia = new Gerencia({
     ger_codigo:req.body.codigo,
     ger_dpto_cod:req.body.codDepartamento,
  })
  gerencia.save()
  .then(res =>{
      console.log(res);
  }).catch(err => console.log(err))
});

router.delete('/borrar', (req, res) => {
    Gerencia.findOneAndDelete({ger_codigo: req.body.codigo }, function (err, docs) {
    if (err){
        console.log(err)
    }
    else{
        console.log("Deleted User : ", docs);
    }
  });
});

router.put('/editar', (req, res) => {
    Gerencia.findOneAndUpdate({ger_codigo: req.body.codigo }, 
      {ger_dpto_cod:req.body.nombre},
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
    Gerencia.findOne({ger_codigo: req.body.codigo}, function (err, docs) {
      if (err){
          console.log(err)
      }
      else{
          console.log("Result : ", docs);
      }
    });
});

router.get("/all",function(req, res) {
    Gerencia.find({}, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});
module.exports = router;