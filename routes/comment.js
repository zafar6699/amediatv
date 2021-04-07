const express = require('express');
const { writeComment, allComments } = require('../controllers/comment');
const router = express.Router({ mergeParams: true });


router.route('/add')
        .post(writeComment);
router.get('/all', allComments)

// router.route('/:id')
//         .put(protect, authorize('admin', 'publisher'), editStatus)
//         .delete(protect, authorize('admin'), deleteComment);

module.exports = router;