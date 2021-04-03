const session = require("express-session")
const Janr = require("../models/janr")
const Slider = require('../models/slider')
const News = require("../models/news")


exports.Home = async (req, res) => {
    const slider = await Slider.find()
        .sort({date: -1})
        .populate({path: 'kino',select: ['name','image','screens','description','rating']})
        .populate({path: 'serial',select: ['name','image','screens','description','rating']})

    
    const news = await News.find()
        .sort({date: -1})
        .limit(3)
        .select(['name','date','image'])
    // const anotatsiya = await Anotatsiya.find({status: true})
    //     .sort({date: -1})
    //     // .limit(1)
    // const kino = await Kino.find()
    //     // .limit(20)
    //     .sort({date: -1})
    //     .select({name: 1, category: 1, image: 1, rating: 1,year: 1, janr: 1,date: 1,description: 1, price:1})
    //     .populate({path: 'category', select: 'nameuz'})
    //     .populate(['janr'])
    // const season = await Season.find()
    //     // .limit(20)
    //     .sort({date: -1})
    //     .select({name: 1, category: 1, image: 1, rating: 1,year: 1, janr: 1,date: 1, num: 1, description: 1, price:1})
    //     .populate({path: 'category', select: 'nameuz'})
    //     .populate(['janr'])

  






    const janr = await Janr.find().sort({createdAt: - 1})
    // const slider = await Slider.find().sort({date: - 1})

    res.render("./main/index", {
        layout: "./layout",
        janr,
        slider,
        title: "Home",
        user: req.session.user,
    })
}

exports.OneJanr = async (req, res) => {
    res.render("./main/onejanr", {title: "Home"})
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