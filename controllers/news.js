const News = require('../models/news')
const asyncHandler = require('../middlewares/async')
const slugify = require('slugify');
const Janr = require("../models/janr")


exports.addNews = asyncHandler(async (req, res, next) => {
  const slug = Math.floor(Math.random() * 10000000)
  const news = new News({
    name: {
      uz: req.body.nameuz,
      ru: req.body.nameru
    },
    description: {
      uz: req.body.descriptionuz,
      ru: req.body.descriptionru
    },
    slug: slugify(slug.toString()),
    tags: req.body.tags,
    videoLink: req.body.videoLink,
    image: `/uploads/cinema/${req.file.filename}`
  })
  news.save()
    .then(() => { res.status(201).json({ success: true, data: news }) })
    .catch((error) => { res.status(400).json({ success: false, error }) })
})
exports.getAll = asyncHandler(async (req, res, next) => {
  const news = await News.find().sort({ date: -1 })
  const janr = await Janr.find().sort({ createdAt: - 1 })
  res.render("./main/allnews", {
    janr,
    news,
    title: "AllNews",
    user: req.session.user
  })

})
exports.getById = async (req, res, next) => {
  const news = await News.findById(req.params.id)
  const janr = await Janr.find().sort({ createdAt: - 1 })
  const allNews = await News.find().sort({ date: -1 }).limit(3);


  res.render("./main/news", {
    news,
    janr,
    allNews,
    title: "News",
    user: req.session.user,
  })
}