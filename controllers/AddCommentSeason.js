const CommentSeason = require('../models/AddCommentSeason')
const Janr = require('../models/janr')

exports.writeComment = async (req, res, next) => {
  const userss = req.session.user
  const commentsss = new CommentSeason({
    message: req.body.message,
    prevComment: req.body.prevComment,
    season: req.body.season,
    userID: userss._id,
  })
  await commentsss.save()
  res.redirect('/')
}




exports.getSort = async (req, res) => {
  let janr = await Janr.find()
  const result = await CommentSeason.find({ prevComment: req.params.id }).sort({ date: -1 })
    .populate({
      path: 'userID', select: ['name', 'photo' ]
    })
    .populate({
      path: 'prevComment', select: 'message' 
    })
    .populate({
      path: 'season', select: 'name' 
    })
  
    res.render("./main/comSeason", {
      title: "AmediaTV.uz",
      layout: 'layout',
      user: req.session.user,
      lang: req.session.ulang,
      janr,
      result
    })

  // res.json({data: result})
}

