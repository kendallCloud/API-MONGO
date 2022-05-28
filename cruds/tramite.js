var mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

var TramiteScheme = new mongoose.Schema({
    // _id: mongoose.Types.ObjectId,
    trm_codigo: String,
    trm_departamento_cod: String,
    //trm_documentos:                       //tramites que necesita
    
  });

  const Tramite = mongoose.model('tramites',TramiteScheme)

router.post('/agregar', (req, res)=> {
  const tramite = new Tramite({
      trm_codigo:req.body.codigo,
      trm_departamento_cod:req.body.codigoDpto,
  })
  tramite.save()
  .then(res =>{
      console.log(res);
  }).catch(err => console.log(err))
});

router.delete('/borrar', (req, res) => {
    Tramite.findOneAndDelete({trm_codigo: req.body.codigo }, function (err, docs) {
    if (err){
        console.log(err)
    }
    else{
        console.log("Deleted User : ", docs);
    }
  });
});

router.put('/editar', (req, res) => {
    Tramite.findOneAndUpdate({trm_codigo: req.body.codigo }, 
      {trm_departamento_cod:req.body.codigoDpto,},
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
    Tramite.findOne({trm_codigo: req.body.codigo}, function (err, docs) {
      if (err){
          console.log(err)
      }
      else{
          console.log("Result : ", docs);
      }
    });
});

router.get("/all",function(req, res) {
  Tramite.find({}, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});
module.exports = router;