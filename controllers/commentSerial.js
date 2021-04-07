const jwt = require('jsonwebtoken')
const CommentSeriya = require('../models/commentSerial');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');

// POST - /api/seriyaComment/add 
exports.addSeriyaComment = asyncHandler(async (req, res) => {
//  const user = jwt.decode(req.headers.authorization.slice(7))
  const user = req.session.user
 const seriyaComment = new CommentSeriya({
  message: req.body.message,
  season: req.body.season,
  user: user._id
 })
 seriyaComment.save()
  .then(() => { res.status(201).json({ success: true, data: seriyaComment }) })
  .catch((error) => {
   res.send(error).json({ success: false, error })
  })
})


// DELETE - /api/seriyaComment/:id 
exports.deleteSeriyaComment = asyncHandler(async (req, res, next) => {
 let seriyaComment = await CommentSeriya.findByIdAndRemove(req.params.id);
 if (!seriyaComment)
  return next(new ErrorResponse(`Resourse not found with id of ${req.params.id}`, 404))
 res.status(200).json({ success: true, data: seriyaComment });
});

// GET - /api/seriyaComment/:id
exports.GetCommnet = asyncHandler(async (req, res) => {
 const seriyaComment = await CommentSeriya.findById(req.params.id)
 res.status(200).json({success: true,data: seriyaComment})
})

// GET - /api/seriyaComment/all 
exports.GetCommnets = asyncHandler(async (req, res) => {
 const seriyaComment = await CommentSeriya.find().sort({ date: -1 }).populate('user')
 res.status(200).json({success: true,data: seriyaComment})
})

// PUT - /api/seriyaComment/:id
exports.EditComment = asyncHandler(async (req, res) => {
 const seriyaComment = await CommentSeriya.findByIdAndUpdate(req.params.id);
 
 seriyaComment.message = req.body.message

 seriyaComment.save({ validateBeforeSave: false })
  .then(() => {
   res.status(200).json({
    success: true,
    data: seriyaComment
   })
  })
  .catch((error) => {
   res.send(error)
  })
})

