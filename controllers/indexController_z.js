const session = require("express-session")
const Janr = require("../models/janr")
const Slider = require('../models/slider')
const Season = require('../models/season')
const News = require("../models/news")
const Kino = require("../models/kino")
const Category = require("../models/category")
const Serial = require("../models/seriya")
const Anotation = require('../models/anotatsiya')


exports.Home = async (req, res) => {

    const Anotatsiya = await Anotation.find().sort({date: -1})
    const anotation = Anotatsiya[0]


    const category = await Category.find()
    let sortKino = []

    for (const item of category) {
        const s = await Season.find({ category: item._id }).sort({ date: -1 }).select({ name: 1, image: 1, price: 1, num: 1 });
        const a = await Kino.find({ category: item._id }).sort({ date: -1 }).select({ name: 1, image: 1, price: 1, num: 1 });
        
        const arraySort = []
        await arraySort.push(s);
        await arraySort.push(a);
        await sortKino.push(arraySort)
    }

    const janr = await Janr.find()
    let slider = await Slider.find()
        .sort({ date: -1 })
        .populate(
            {
                path: 'kino',
                select: ['name', 'image', 'screens', 'description', 'rating']
            }
        )
        .populate(
            {
                path: 'serial',
                select: ['name', 'image', 'screens', 'description', 'rating']
            }
        )


    const oneKino = await Kino.find().sort({ date: -1 }).limit(1)
        .select({ name: 1, category: 1, image: 1, rating: 1, year: 1, janr: 1, date: 1, description: 1, video: 1 })
        .populate({ path: 'category', select: 'nameuz' })
        .populate(['janr'])

    const news = await News.find()
        .sort({ date: -1 })
        .limit(3)
        .select(['name', 'date', 'image'])

    const kino = await Kino.find()
        .sort({ date: -1 })
        .select({ name: 1, category: 1, url: 1, image: 1, rating: 1, year: 1, janr: 1, date: 1, description: 1, price: 1 })
        .populate({ path: 'category', select: 'nameuz' })
        .populate(['janr'])
   

    res.render("./main/index", {
        title: "AmediaTV.uz",
        layout: "./layout",
        user: req.session.user, lang: req.session.ulang,
        janr, slider, oneKino, news, kino, category, sortKino, anotation
    })

    // res.json(sortKino)

}

exports.OneJanr = async (req, res) => {
    res.render("./main/onejanr", { title: "AmediaTV.uz" })
}
exports.Janrs = async (req, res) => {
    const result = new Janr(req.body);
    await result.save()
        .then(response => {
            res.status(200).json({
                data: response
            })
        })
        .catch(error => {
            res.status(400).json({
                error: error
            })
        })
}