const express = require('express')
const router = express.Router({mergeParams: true});

const { writeComment, getAll, getOne} = require("../controllers/AddCommentSeason")

router.post('/', writeComment)
router.get('/all', getAll)
router.get('/:id', getOne)

module.exports = router 