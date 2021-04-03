const express = require('express')
const router = express.Router();

const{ getJanr } = require("../controllers/janr")

router.get("/byjanr/:id", getJanr)

module.exports = router