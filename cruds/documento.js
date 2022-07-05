var mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { s3Uploadv2 } = require('../src/s3service');

var DocumentoScheme = new mongoose.Schema({
  // _id: mongoose.Types.ObjectId,
  dto_tipoDocumento: String,
  dto_caso_codigo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'casos' }],
  dto_doc_link: String,
});

const Documento = mongoose.model('documentos', DocumentoScheme)
//////////////////////////////////////////////////////////////////////////
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
  }
};

const upload = multer({
  storage,
  // fileFilter,
  limits: { fileSize: 1000000000, files: 2 },
});
router.post('/upload', upload.array('file'), async (req, res) => {
  const file = req.files[0];
  console.log("header ", req.headers);
  console.log(file);
  const result = await s3Uploadv2(file)
  console.log(result.Location);

  const documento = new Documento({
    dto_tipoDocumento: req.headers.nombre_doc,
    dto_caso_codigo: req.headers.caso,
    dto_doc_link: result.Location,
  })
  documento.save()
    .then(res => {
      console.log(res);
    }).catch(err => console.log(err))

  res.json({ status: 'succes' });
});

///////////////////////////////////////////////////////////////////////////////

router.post('/agregar', (req, res) => {
  const documento = new Documento({
    dto_codigo: req.body.codigo,
    dto_tramite_cod: req.body.tramiteCod,
  })
  documento.save()
    .then(res => {
      console.log(res);
    }).catch(err => console.log(err))
});

router.delete('/borrar', (req, res) => {
  Documento.findOneAndDelete({ dto_codigo: req.body.codigo }, function (err, docs) {
    if (err) {
      console.log(err)
    }
    else {
      console.log("Deleted User : ", docs);
    }
  });
});

router.put('/editar', (req, res) => {
  Documento.findOneAndUpdate({ dto_codigo: req.body.codigo },
    { dto_tramite_cod: req.body.tramiteCod },
    function (err, docs) {
      if (err) {
        console.log(err)
      }
      else {
        console.log("Original Doc : ", docs);
      }
    });
});

router.get('/existe', (req, res) => {
  console.log("headers ", req.headers)
  Documento.findOne({dto_caso_codigo: req.headers.caso, dto_tipoDocumento: req.headers.nombre}, function (err, docs) {
    if (err) {
      console.log(err)
      res.send({ estado: 3 });
    }
    else {
      console.log("Result : ", docs);
      if (docs !== null) res.send({ estado: 1 });
      else res.send({ estado: 3 });
    }
  });
});

router.get("/all", function (req, res) {
  Documento.find({/**/ }, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});
module.exports = router;