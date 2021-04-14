const express = require('express');
const router = express.Router();
const { updateFile } = require('../controllers/users');
const multer = require('multer')
const md5 = require('md5')
const path = require('path')
const storage = multer.diskStorage({
 destination: function (req, file, cb) {
  cb(null, './public/uploads');
 },
 filename: function (req, file, cb) {
  cb(null, `${md5(Date.now())}${path.extname(file.originalname)}`);
 }
});
const upload = multer({ storage: storage });

router.post('/:id', upload.single('photo'), updateFile);

module.exports = router;
