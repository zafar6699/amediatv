const express = require('express')
const router = express.Router({mergeParams: true});

const { getByJanr } = require("../controllers/janr")

router.get('/:id', getByJanr)



module.exports = router