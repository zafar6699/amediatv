const session = require("express-session")
const Janr = require("../models/janr")
const Slider = require('../models/slider')
const Season = require('../models/season')
const News = require("../models/news")
const Kino = require("../models/kino")
const Category = require("../models/category")
const Serial = require("../models/seriya")


exports.Home = async (req, res) => {
    const category = await Category.find()

    let sortKino = []


    category.forEach(async (element) => {
        let s = await Kino.find({ category: { $all: [element._id] } }).select({ name: 1, image: 1, price: 1 });
        sortKino.push(s);
    });


    const janr = await Janr.find()

    // const slider = await Slider.find()
    //     .sort({ date: -1 })
    //     .populate({ path: 'kino', select: ['name', 'image', 'screens', 'description', 'rating'] })
    // // .populate({path: 'serial',select: ['name','image','screens','description','rating']})

    let slider = await Slider.find()
        .sort({ date: -1 })
        .populate(
            {
                path: 'kino',
                select: ['name', 'image', 'screens','description', 'rating']
            }
        )
        .populate(
            {
                path: 'serial',
                select: ['name', 'image', 'screens','description', 'rating']
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
    const serial = await Season.find()
        .limit(4)
        .sort({ date: -1 })
        // .select({name: 1, category: 1, image: 1, rating: 1,year: 1, janr: 1,date: 1, num: 1, description: 1, price:1})
        .populate({ path: 'category', select: 'nameuz' })
        .populate(['janr'])

    const seasonSerial = await Serial.find({season: req.params.id})




    res.render("./main/index", {
        title: "AmediaTV.uz",
        layout: "./layout",
        user: req.session.user, lang: req.session.ulang,
        serial, janr, slider, oneKino, news, kino, category, sortKino, seasonSerial
    })
    console.log(seasonSerial)

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