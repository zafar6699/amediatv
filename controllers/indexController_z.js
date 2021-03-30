const Janr = require("../models/comment")

exports.Home = async (req, res) => {
    const janr = await Janr.find()

    // res.render("./main/index", {
    //     janr: janrs,
    //     title: "Home"
    // })
    res.status(201).json({
        data: janr 
    })
}