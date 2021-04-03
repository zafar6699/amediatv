const Janr = require("../models/janr")

exports.Profile = async (req, res) => {
    const janr = await Janr.find().sort({createdAt: - 1})
    res.render("./main/profile", { title: "Profile", janr, user: req.session.user, layout: "layout" })
}