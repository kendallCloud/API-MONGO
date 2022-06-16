var mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

var AprobadoXdepartamentoScheme = new mongoose.Schema({
    // _id: mongoose.Types.ObjectId,
    axd_codigo: String,
    axd_dpto_cod: String,
    axd_tramite_cod: String,
    axd_aprobed: Boolean,
    axd_orden: Number,
  });

  const AprobadoXdepartamento = mongoose.model('aprobadosXdepartamentos',AprobadoXdepartamentoScheme)

router.post('/agregar', (req, res)=> {
  const aprobadoXdepartamento = new AprobadoXdepartamento({
    axd_codigo:req.body.codigo,
    axd_dpto_cod:req.body.codDpto,
    axd_tramite_cod:req.body.codTramite,
    axd_orden:req.body.orden,
    axd_aprobed:req.body.aprobed
  })
  aprobadoXdepartamento.save()
  .then(res =>{
      console.log(res);
  }).catch(err => console.log(err))
});

router.delete('/borrar', (req, res) => {// cambiar por id*
    AprobadoXdepartamento.findOneAndDelete({axd_codigo: req.body.codigo }, function (err, docs) {
    if (err){
        console.log(err)
    }
    else{
        console.log("Deleted User : ", docs);
    }
  });
});

router.put('/editar', (req, res) => {// cambiar por id*
    AprobadoXdepartamento.findOneAndUpdate({axd_codigo: req.body.codigo }, 
      {axd_dpto_cod:req.body.codDpto,
        axd_tramite_cod:req.body.codTramite,
        axd_orden:req.body.orden,
        axd_aprobed:req.body.aprobed},
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
    AprobadoXdepartamento.findOne({axd_codigo: req.body.codigo}, function (err, docs) {
      if (err){
          console.log(err)
      }
      else{
          console.log("Result : ", docs);
      }
    });
});

router.get("/all",function(req, res) {
    AprobadoXdepartamento.find({}, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});
module.exports = router;