const express = require('express')
const router = express.Router({mergeParams: true});
const multer = require('multer')
const md5 = require('md5')
const path = require('path')

const {
    addSeason,
    getAllSeason,
    getByIdSeason,
    getByIdSeriya,
    addSeriya
} = require('../controllers/season')



const storage = multer.diskStorage({
    destination: function (req,file,cb) {
        cb(null, './public/uploads/cinema/org');
    },
    filename: function (req,file,cb) {
        cb(null, `${md5(Date.now())}${path.extname(file.originalname)}`);
    }
});
const upload = multer({storage: storage});
// Season Router
router.post('/add', upload.array('images', 10), addSeason)

router.post('/seriya/add',addSeriya)
router.get('/all', getAllSeason )
router.get('/:id', getByIdSeason)

module.exports = router;


