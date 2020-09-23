var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');

const fs = require('fs')
const MD5 = require('md5')

const upload = multer()

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/upload', upload.array('RemoteFile', 12), function(req, res, next) {
  let files = req.files
  if (files.length) {
    files.forEach(file => {
      let name = file.originalname
      let data = file.buffer
      let destPath = path.join(__dirname, '..', 'upload')
      fs.writeFile(path.join(destPath, name), data, (err) => { console.error(`writing ${name} encountered ${err}`) })
    })
  }
  res.statusCode = 200
  res.statusMessage = 'uploaded'
  res.send()
})

module.exports = router;
