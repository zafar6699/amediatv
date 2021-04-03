const session = require("express-session")
const Janr = require("../models/janr")
const Slider = require('../models/slider')

exports.Home = async (req, res) => {
    const janr = await Janr.find().sort({createdAt: - 1})
    const slider = await Slider.find().sort({date: - 1})

    res.render("./main/index", {
        layout: "./layout",
        janr,
        slider: slider,
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