const express = require('express');

const router = express.Router();

router.get("/404", (req, res) => {
    res.render("./main/404", { title: "404", layout: './error' })
})

module.exports = router;