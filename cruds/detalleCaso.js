var mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

var DetalleCasoScheme = new mongoose.Schema({
    // _id: mongoose.Types.ObjectId,
    dtc_codigo: String,
    dtc_fecha_rec: String,
    dtc_correcto: Boolean,
  });

  const DetalleCaso = mongoose.model('detallesCasos',DetalleCasoScheme)

router.post('/agregar', (req, res)=> {
  const detalleCaso = new DetalleCaso({
    dtc_codigo:req.body.codigo,
    dtc_fecha_rec:req.body.fechaRecibido,
    dtc_correcto:req.body.correcto
  })
  detalleCaso.save()
  .then(res =>{
      console.log(res);
  }).catch(err => console.log(err))
});

router.delete('/borrar', (req, res) => {
    DetalleCaso.findOneAndDelete({dtc_codigo: req.body.codigo }, function (err, docs) {
    if (err){
        console.log(err)
    }
    else{
        console.log("Deleted User : ", docs);
    }
  });
});

router.put('/editar', (req, res) => {
    DetalleCaso.findOneAndUpdate({dtc_codigo: req.body.codigo }, 
      {dtc_fecha_rec:req.body.fechaRecibido, dtc_correcto:req.body.correcto},
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
    DetalleCaso.findOne({dtc_codigo: req.body.codigo}, function (err, docs) {
      if (err){
          console.log(err)
      }
      else{
          console.log("Result : ", docs);
      }
    });
});

router.get("/all",function(req, res) {
    DetalleCaso.find({}, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});
module.exports = router;