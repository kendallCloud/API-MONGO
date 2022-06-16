var mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

var ParametroScheme = new mongoose.Schema({
    // _id: mongoose.Types.ObjectId,
    par_codigo: String,
    par_logo: String,
    par_nombre: String,
    par_ced_juridica: String,
    par_email:String,
    par_departamentos:Array
  });

  const Parametro = mongoose.model('parametros',ParametroScheme)

router.post('/agregar', (req, res)=> {
  const parametro = new Parametro({
    par_codigo:req.body.codigo,
    par_logo:req.body.logo,
    par_nombre:req.body.nombre,
    par_ced_juridica:req.body.cedJuridica,
    par_email:req.body.email,
    par_departamentos:req.body.departamentos,

  })
  parametro.save()
  .then(res =>{
      console.log(res);
  }).catch(err => console.log(err))
});

router.delete('/borrar', (req, res) => {
    Parametro.findOneAndDelete({par_codigo: req.body.codigo }, function (err, docs) {
    if (err){
        console.log(err)
    }
    else{
        console.log("Deleted User : ", docs);
    }
  });
});

router.put('/editar', (req, res) => {
    Parametro.findOneAndUpdate({par_codigo: req.body.codigo }, 
      {par_logo:req.body.logo,
        par_nombre:req.body.nombre,
        par_ced_juridica:req.body.cedJuridica,
        par_email:req.body.email,
        par_departamentos:req.body.departamentos,},
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
    Parametro.findOne({par_codigo: req.body.codigo}, function (err, docs) {
      if (err){
          console.log(err)
      }
      else{
          console.log("Result : ", docs);
      }
    });
});

router.get("/all",function(req, res) {
    Parametro.find({}, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});
module.exports = router;