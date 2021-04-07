const express = require('express');
const { writeComment, allComments } = require('../controllers/comment');
const router = express.Router({ mergeParams: true });

router.post("/kino", async (req, res) => {
    const comment = await Comment.create(req.body);
    
    res.status(201).json({success: true, data: comment})
})

router.route('/add')
        .post(writeComment);
router.get('/all', allComments)

// router.route('/:id')
//         .put(protect, authorize('admin', 'publisher'), editStatus)
//         .delete(protect, authorize('admin'), deleteComment);

module.exports = router;