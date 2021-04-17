const CommentSeason = require('../models/AddCommentSeason')

exports.writeComment = async (req, res, next) => {
  const user = req.session.user
  const comment = new CommentSeason({
    message: req.body.message,
    prevComment: req.body.prevComment,
    season: req.body.season,
    userID: user._id,
  })
  await comment.save()
  res.redirect(`/`)
}


exports.getAll = async (req, res) => {
  const result = await CommentSeason.find()
  res.status(200).json(result)
}

exports.getSort = async (req, res) => {
  const result = await CommentSeason.find({ prevComment: req.params.id }).sort({ date: -1 })
    .populate({
      path: 'userID', select: 'name'
    })
    res.status(200).json(result)
}

