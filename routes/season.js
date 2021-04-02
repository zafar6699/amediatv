const express = require('express')
const router = express.Router({mergeParams: true});
const multer = require('multer')
const md5 = require('md5')
const path = require('path')
const {protect , authorize} = require('../middlewares/auth');

const {
    //Season
    addSeason,
    getAllSeason,
    getByIdSeason,
    deleteSeason,
    updateSeason,
    editPoster,
    editScreens,
    checkStatusSeason,


    // Seriya
    addSeriya,
    updateSeriya,
    deleteSeriya
    
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
router.get('/all', getAllSeason )
router.get('/:id', getByIdSeason)
router.post('/add',upload.array('images',10),addSeason)

router.delete('/:id' ,protect,authorize('admin') ,deleteSeason)
router.put('/:id', protect, authorize('admin'), updateSeason)
// edit poster screens
router.put('/:id/poster',upload.single('images'), editPoster)
router.put('/:id/screens',upload.array('images',12), editScreens)


// Seriya Router
router.post('/seriya/add',protect,authorize('admin'),addSeriya)
router.put('/seriya/:id',protect,authorize('admin'),updateSeriya)
router.delete('/seriya/:id',protect,authorize('admin'),deleteSeriya)
module.exports = router;
