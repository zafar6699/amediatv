const express = require("express")
const router = express.Router()
const Comment = require("../models/comment");

router.post("/kino", async (req, res) => {
    const comment = await Comment.create(req.body);
    
    res.status(201).json({success: true, data: comment})
})

module.exports = router