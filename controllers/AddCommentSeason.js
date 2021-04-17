const Comment = require('../models/AddCommentSeason')
const CommentSeason = require('../models/commentSerial')

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

exports.getOne = async (req, res) => {
  const comment = await Comment.findById({ _id: req.body.id })
    .populate({
      path: 'userID', select: ['name']
    })

  res.json(comment)
}


exports.getAll = async (req, res) => {
  const commentSeason = await CommentSeason.find()
  const comSeas = commentSeason
  const comment = await Comment.find({ prevComment: comSeas._id }).sort({ date: -1 })
    .populate({
      path: 'userID', select: 'name'
    })

  res.json(comment)
}