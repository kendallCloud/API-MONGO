var mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

var TramiteScheme = new mongoose.Schema({
    // _id: mongoose.Types.ObjectId,
    trm_nombre: String,
    trm_codigo: String,
    trm_departamentosAprueban:Array,              //departamentos que lo aprueban
    trm_departamento_cod:{type: mongoose.Schema.Types.ObjectId,ref: 'departamentos'},               //departamento que lo realiza
    trm_documentos: Array                      //documentos que necesita
    
  });

  const Tramite = mongoose.model('tramites',TramiteScheme)

router.post('/agregar', (req, res)=> {
  const tramite = new Tramite({
    trm_nombre: req.body.trm_nombre,
    trm_codigo: req.body.trm_codigo,
    trm_departamentosAprueban:req.body.trm_departamentosAprueban,              //departamentos que lo aprueban
    trm_departamento_cod: req.body.trm_departamento_cod,               //departamento que lo realiza
    trm_documentos: req.body.trm_documentos    
  })
  tramite.save()
  .then(res =>{
      console.log(res);
  }).catch(err => console.log(err))
});

router.delete('/borrar', (req, res) => {// cambiar por id*
  console.log(req.body.id)
    Tramite.findOneAndDelete({_id: req.body.id }, function (err, docs) {
    if (err){
        console.log(err)
    }
    else{
        console.log("Deleted tramite : ", docs);
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

router.get('/find', (req, res) => {
  console.log("id :",req);
    Tramite.findOne({trm_codigo:req.body.id}, function (err, docs) {
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
  })
});
module.exports = router;