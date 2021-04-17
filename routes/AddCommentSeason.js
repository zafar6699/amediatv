const express = require('express')
const router = express.Router();
const comment = require("../controllers/AddCommentSeason")

router.post('/add', comment.writeComment)
router.get('/all', comment.getAll)
router.get('/:id', comment.getSort)

module.exports = router 