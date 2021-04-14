const Janr = require("../models/janr")
const priceList = require('../models/priceList')
const Comment = require('../models/comment')
const CommentSeriya = require('../models/commentSerial')
exports.Profile = async (req, res) => {
    const janr = await Janr.find().sort({ createdAt: - 1 })
    const list = await priceList.find().sort({ date: -1 })
    const comment = await Comment.find().sort({ date: -1 })
        .populate(
            {
                path: "user", select: ['name', 'photo']
            },
        )
        .populate(
            {
                path: "kinoId", select: 'name'
            },
        )
        .sort({ date: -1 }).limit(25)

    const commentSeriya = await CommentSeriya.find().sort({ date: -1 })
        .populate(
            {
                path: "user", select: ['name', 'photo']
            },
        )
        .populate(
            {
                path: "season", select: 'name'
            },
        )
        .sort({ date: -1 }).limit(25)

    res.render("./main/profile", {
        title: "Profile",
        layout: "layout",
        janr,
        list,
        user: req.session.user,
        comment,
        commentSeriya,
        balance: req.session.balance


    })

    // res.json(comment)

}