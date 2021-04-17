const CommentSeason = require('../models/AddCommentSeason')

exports.writeComment = async (req, res, next) => {

  const comment = await SeriyaCommnent.find({ season: req.params.id })
    .sort({ date: -1 })
    .populate(['user'])
  const seasonCOM = await SeasonComment()

  let janr = await Janr.find()
  const seria = await Seriya.find({ season: req.params.id })
    .populate(['season'])
  const season = await Season.findById(req.params.id)
    .populate(['category', 'janr', 'translator', 'tayming', 'tarjimon', 'seriya'])

  const userss = req.session.user
  const commentsss = new CommentSeason({
    message: req.body.message,
    prevComment: req.body.prevComment,
    season: req.body.season,
    userID: userss._id,
  })
  await commentsss.save()
  res.render("./main/oneserial", {
    title: "AmediaTV.uz",
    layout: 'layout',
    user: req.session.user,
    lang: req.session.ulang,
    janr,
    serial: season,
    seria,
    comment
  })
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

