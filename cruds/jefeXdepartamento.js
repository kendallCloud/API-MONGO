var mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

var JefeXdepartamentoScheme = new mongoose.Schema({
    // _id: mongoose.Types.ObjectId,
    jxd_codigo: String,
    jdx_persona_cod: String,
    jdx_departamento_cod: String,
  });

  const JefeXdepartamento = mongoose.model('jefesXdepartamentos',JefeXdepartamentoScheme)

router.post('/agregar', (req, res)=> {
  const jefeXdepartamento = new JefeXdepartamento({
    jxd_codigo:req.body.codigo,
    jdx_persona_cod:req.body.codPersona,
    jdx_departamento_cod:req.body.codDpto
  })
  jefeXdepartamento.save()
  .then(res =>{
      console.log(res);
  }).catch(err => console.log(err))
});

router.delete('/borrar', (req, res) => {
    JefeXdepartamento.findOneAndDelete({jxd_codigo: req.body.codigo }, function (err, docs) {
    if (err){
        console.log(err)
    }
    else{
        console.log("Deleted User : ", docs);
    }
  });
});

router.put('/editar', (req, res) => {
    JefeXdepartamento.findOneAndUpdate({jxd_codigo: req.body.codigo }, 
      {jdx_persona_cod:req.body.codPersona,
        jdx_departamento_cod:req.body.codDpto},
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
    JefeXdepartamento.findOne({jxd_codigo: req.body.codigo}, function (err, docs) {
      if (err){
          console.log(err)
      }
      else{
          console.log("Result : ", docs);
      }
    });
});

router.get("/all",function(req, res) {
    JefeXdepartamento.find({}, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});
module.exports = router;