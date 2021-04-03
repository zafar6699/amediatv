const express = require('express')
const router = express.Router({mergeParams: true});
const {
    addCinema,
    getAll,
    sortByCat
} = require('../controllers/kino')
const multer = require('multer')
const md5 = require('md5')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req,file,cb) {
        cb(null, './public/uploads/cinema/org');
    },
    filename: function (req,file,cb) {
        cb(null, `${md5(Date.now())}${path.extname(file.originalname)}`);
    } 
});
const upload = multer({storage: storage});

router.post('/add', upload.array('images', 12), addCinema)
router.get('/all',getAll)
router.get('/sort',sortByCat)


module.exports = router





