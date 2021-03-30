const Janr = require("../models/janr")


exports.Home = async (req, res) => {
    const janr = await Janr.find();

    res.render("./main/index", {
        janr: janr,
        title: "Home"
    })
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