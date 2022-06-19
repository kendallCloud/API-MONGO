var mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

var TramiteScheme = new mongoose.Schema({
    // _id: mongoose.Types.ObjectId,
    trm_nombre: String,
    trm_codigo: String,
    trm_departamentosAprueban:Array,              //departamentos que lo aprueban
    trm_departamento_cod: String,               //departamento que lo realiza
    trm_documentos: Array                      //documentos que necesita
    
  });

  const Tramite = mongoose.model('tramites',TramiteScheme)

router.post('/agregar', (req, res)=> {
  const tramite = new Tramite({
    trm_nombre: rep.body.trm_nombre,
    trm_codigo: rep.body.trm_codigo,
    trm_departamentosAprueban:rep.body.trm_departamentosAprueban,              //departamentos que lo aprueban
    trm_departamento_cod: rep.body.trm_departamento_cod,               //departamento que lo realiza
    trm_documentos: rep.body.trm_documentos    
  })
  tramite.save()
  .then(res =>{
      console.log(res);
  }).catch(err => console.log(err))
});

router.delete('/borrar', (req, res) => {// cambiar por id*
    Tramite.findOneAndDelete({trm_codigo: req.body.codigo }, function (err, docs) {
    if (err){
        console.log(err)
    }
    else{
        console.log("Deleted User : ", docs);
    }
  });
});

router.put('/editar', (req, res) => {// cambiar por id*
    Tramite.findOneAndUpdate({trm_codigo: req.body.codigo }, // cambiar por id*
      {/*trm_departamento_cod:req.body.codigoDpto,*/
        trm_nombre: req.body.nombre},
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