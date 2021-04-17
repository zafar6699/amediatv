const express = require('express')
const router = express.Router({mergeParams: true});

const { writeComment, getAll} = require("../controllers/AddCommentSeason")

router.post('/', writeComment)
router.get('/:prevComment', getAll)

module.exports = router 