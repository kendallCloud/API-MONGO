var mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

var CasoScheme = new mongoose.Schema({
    // _id: mongoose.Types.ObjectId,
    cso_numero_caso: String,
    cso_fecha_apertura: String,
    cso_fecha_traspaso: String,
    cso_fecha_final: String,
    //cso_tramite_cod: String,
  });

  const Caso = mongoose.model('casos',CasoScheme)

router.post('/agregar', (req, res)=> {
  const caso = new Caso({
      cso_numero_caso:req.body.numeroCaso,
      cso_fecha_apertura:req.body.fechaApertura,
      cso_fecha_traspaso: req.body.fechaTraspaso,
      cso_fecha_final:req.body.fechaFinal,
      //cso_tramite_cod:req.body.codTramite                 //Tramite al que pertenece
  })
  caso.save()
  .then(res =>{
      console.log(res);
  }).catch(err => console.log(err))
});

router.delete('/borrar', (req, res) => {
  Caso.findOneAndDelete({cso_numero_caso: req.body.numeroCaso }, function (err, docs) {
    if (err){
        console.log(err)
    }
    else{
        console.log("Deleted User : ", docs);
    }
  });
});

router.put('/editar', (req, res) => {
     Caso.findOneAndUpdate({cso_numero_caso: req.body.numeroCaso }, 
      {cso_fecha_apertura:req.body.fechaApertura, cso_fecha_traspaso: req.body.fechaTraspaso, cso_fecha_final:req.body.fechaFinal},
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
    Caso.findOne({cso_numero_caso: req.body.numeroCaso}, function (err, docs) {
      if (err){
          console.log(err)
      }
      else{
          console.log("Result : ", docs);
      }
    });
});

router.get("/all",function(req, res) {
  Caso.find({}, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});
module.exports = router;