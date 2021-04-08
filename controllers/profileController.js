const Janr = require("../models/janr")
const priceList = require('../models/priceList')
const comments = require('../models/')
exports.Profile = async (req, res) => {
    const janr = await Janr.find().sort({ createdAt: - 1 })
    const list = await priceList.find().sort({ date: -1 })
    // const 
    res.render("./main/profile", {
        title: "Profile",
        layout: "layout",
        janr,
        list,
        user: req.session.user,

        balance: req.session.balance
        
        
    })

}