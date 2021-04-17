const CommentSeason = require('../models/AddCommentKino')
const Janr = require('../models/janr')

exports.writeComment = async (req, res, next) => {
  // const userss = req.session.user
  // const commentsss = new CommentSeason({
  //   message: req.body.message,
  //   prevComment: req.body.prevComment,
  //   userID: userss._id,
  // })
  // await commentsss.save()
  // res.redirect('/')
  const comment = await CommentSeason.create(req.body);
  res.redirect(`/kino/${req.body.prevComment}`)
}




exports.getSort = async (req, res) => {
  let janr = await Janr.find()
  const result = await CommentSeason.find({ prevComment: req.params.id }).sort({ date: -1 })
    .populate({
      path: 'userID', select: ['name', 'photo']
    })
    .populate({
      path: 'prevComment', select: 'message'
    })


  res.render("./main/comKino", {
    title: "AmediaTV.uz",
    layout: 'layout',
    user: req.session.user,
    lang: req.session.ulang,
    janr,
    result
  })

  // res.json({data: result})
}

