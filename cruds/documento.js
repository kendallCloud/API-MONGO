var mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const multer =require('multer');

var DocumentoScheme = new mongoose.Schema({
    // _id: mongoose.Types.ObjectId,
    dto_codigo: String,
    dto_tramite_cod: String,
  });

  const Documento = mongoose.model('documentos',DocumentoScheme)

const upload=multer({dest: 'uploads/'});  
router.post('/upload',upload.single('file'),(req,res)=>{
  res.json({status: 'succes'});
});

router.post('/agregar', (req, res)=> {
  const documento = new Documento({
    dto_codigo:req.body.codigo,
    dto_tramite_cod:req.body.tramiteCod,
  })
  documento.save()
  .then(res =>{
      console.log(res);
  }).catch(err => console.log(err))
});

router.delete('/borrar', (req, res) => {
    Documento.findOneAndDelete({dto_codigo: req.body.codigo }, function (err, docs) {
    if (err){
        console.log(err)
    }
    else{
        console.log("Deleted User : ", docs);
    }
  });
});

router.put('/editar', (req, res) => {
    Documento.findOneAndUpdate({dto_codigo: req.body.codigo }, 
      {dto_tramite_cod:req.body.tramiteCod},
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
    Documento.findOne({dto_codigo: req.body.codigo}, function (err, docs) {
      if (err){
          console.log(err)
      }
      else{
          console.log("Result : ", docs);
      }
    });
});

router.get("/all",function(req, res) {
    Documento.find({}, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});
module.exports = router;