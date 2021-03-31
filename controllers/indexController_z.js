const Janr = require("../models/janr")


exports.Home = async (req, res) => {
    const janr = await Janr.find();
    res.render("./main/index", {title: "Home", layout: 'layout', janr})
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