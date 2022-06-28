var mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

var CasoScheme = new mongoose.Schema({
    // _id: mongoose.Types.ObjectId,
    cso_numero_caso: String,
    cso_fecha_apertura: String,
    cso_fecha_traspaso: String,
    cso_tramite_cod: [{type: mongoose.Schema.Types.ObjectId,ref: 'tramites'}],
    cso_fecha_final: String,
    cso_tramite_cod: String,
  });

  const Caso = mongoose.model('casos',CasoScheme)

router.post('/agregar', (req, res)=> {
  const caso = new Caso({
      cso_numero_caso:req.body.cso_numero_caso,
      cso_fecha_apertura:req.body.cso_fecha_apertura,
      cso_fecha_traspaso: req.body.cso_fecha_traspaso,
      cso_fecha_final:req.body.cso_fecha_final,
<<<<<<< Updated upstream
      cso_tramite_cod:req.body.cso_tramite_cod                 //Tramite al que pertenece
=======
      cso_tramite_cod:req.body.cso_tramite_cod //Tramite al que pertenece
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
     Caso.findOneAndUpdate({_id: req.body._id }, 
      {      cso_numero_caso:req.body.cso_numero_caso,
        cso_fecha_apertura:req.body.cso_fecha_apertura,
        cso_fecha_traspaso: req.body.cso_fecha_traspaso,
        cso_fecha_final:req.body.cso_fecha_final,
        cso_tramite_cod:req.body.cso_tramite_cod },
      function (err, docs) {
=======
     Caso.findOneAndUpdate({cso_numero_caso: req.body.numeroCaso }, 
      {cso_fecha_apertura:req.body.fechaApertura, cso_fecha_traspaso: req.body.fechaTraspaso, cso_fecha_final:req.body.fechaFinal},
      function (err,docs) {
>>>>>>> Stashed changes
      if (err){
          console.log(err)
      }
      else{
          console.log("Original: ",docs);
          console.log("Nuevo : ",req.body);

      }
    });
});

router.get('/buscar', (req, res) => {
  console.log(req.headers.cod);
    Caso.findOne({cso_numero_caso:req.headers.cod}, function (err, docs) {
      if (err){
          console.log(err)
      }
      else{
        console.log("Result : ", docs);
        res.json(docs);
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