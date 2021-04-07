const express = require('express');
const { writeComment, allComments } = require('../controllers/comment');
const router = express.Router({ mergeParams: true });
const Comment = require("../models/comment")
const CommentSeason = require("../models/commentSerial")

router.post("/kino", async (req, res) => {
    const comment = await Comment.create(req.body);
    
    res.redirect(`/kino/${req.body.kinoId}`)
})
router.post("/season", async (req, res) => {
    const comment = await CommentSeason.create(req.body);
    
    res.redirect(`/season/${req.body.season}`)

})

// router.route('/add')
//         .post(writeComment);
// router.get('/all', allComments)

// router.route('/:id')
//         .put(protect, authorize('admin', 'publisher'), editStatus)
//         .delete(protect, authorize('admin'), deleteComment);

module.exports = router;