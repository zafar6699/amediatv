const Comment = require('../models/AddCommentSeason')

exports.writeComment = async (req, res, next) => {
  const user = req.session.user;
  const comment = new Comment({
    message: req.body.message,
    prevComment: req.body.prevComment,
    userID: user._id,
  })
  await comment.save()
    .then(() => {
      res.json({ data: comment })
    })
    .catch((error) => {
      res.json({ data: error })
    })
}



exports.getAll = async (req, res) => {
  const comment1 = await Comment.find({ prevComment: req.params.id }).sort({ date: -1 })
    .populate({
      path: 'userID', select: 'name'
    })
  res.json(comment1)
}