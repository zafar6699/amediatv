const Janr = require("../models/janr")
const priceList = require('../models/priceList')
const Comment = require('../models/comment')
exports.Profile = async (req, res) => {
    const janr = await Janr.find().sort({ createdAt: - 1 })
    const list = await priceList.find().sort({ date: -1 })
    const comment = await Comment.find().sort({ date: -1 }).limit(25)
        .populate({path: "Users", select: "name"})
        .populate({path: "kino"})
    res.render("./main/profile", {
        title: "Profile",
        layout: "layout",
        janr,
        list,
        user: req.session.user,
        comment,
        balance: req.session.balance


    })

}