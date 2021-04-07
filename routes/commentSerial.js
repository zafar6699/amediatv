const express = require('express');
const router = express.Router({mergeParams: true});
const seriyaComment= require('../controllers/commentSerial');

router.post('/add', seriyaComment.addSeriyaComment)
router.get('/all',seriyaComment.GetCommnets)
router.get('/:id',seriyaComment.GetCommnet)
router.put('/:id', seriyaComment.EditComment)
router.delete('/:id', seriyaComment.deleteSeriyaComment)

module.exports = router;