const Kino = require('../models/kino')
const Season = require('../models/season')
const Janr = require('../models/janr')
const asyncHandler = require('../middlewares/async')
const ErrorResponse = require('../utils/errorResponse');

exports.search = asyncHandler(async (req, res, next) => {
    const janr = await Janr.find()

    let searchOne = req.query.name;
    let searchingQuery1 = new RegExp(searchOne);
    let arr = []
    const kino = await Kino.find()
        .or([
            { ['name.uz']: { $regex: searchingQuery1, $options: 'i' } },
        ])
        .sort({ date: -1 })
        .populate({ path: 'category' })
        .populate({ path: 'member' })
        .populate({ path: 'janr' })

    const season = await Season.find()
        .or([
            { ['name.uz']: { $regex: searchingQuery1, $options: 'i' } },
        ])
        .sort({ date: -1 })
        .populate({ path: 'category' })
        .populate({ path: 'member' })
        .populate({ path: 'janr' })

    if (!kino && searchOne == [] && searchOne.name == '' && searchOne.name == null && searchOne.name == undefined) {
        res.redirect('/')
    }

    arr.push(season)
    arr.push(kino)
    // res.json(arr)


    res.render('./main/search', {
        title: "AmediaTV.uz", layout: 'layout',
        user: req.session.user,
        lang: req.session.ulang,
        arr,
        janr
    })
})

exports.filterByYear = asyncHandler(async (req, res, next) => {
    const pageNumber = req.query.page
    const kino = await Kino.find({ info: { year: req.query.year } })
        .sort({ date: -1 })
        .populate({ path: 'category', select: 'name' })
        .skip((pageNumber - 1) * 20)
        .limit(20)
        .sort({ date: -1 })
        .select({ name: 1, category: 1, type: 1, image: 1 })

    res.status(200).json({
        success: true,
        data: kino
    })
})

exports.searchDropDown = asyncHandler(async (req, res, next) => {

    let searchOne = req.query.name;
    let searchingQuery1 = new RegExp(searchOne);
    let arr = []
    const kino = await Kino.find()
        .or([
            { ['name.uz']: { $regex: searchingQuery1, $options: 'i' } },
        ])
        .sort({ date: -1 })
        .populate({ path: 'category' })
        .populate({ path: 'member' })
        .populate({ path: 'janr' })

    const season = await Season.find()
        .or([
            { ['name.uz']: { $regex: searchingQuery1, $options: 'i' } },
        ])
        .sort({ date: -1 })
        .populate({ path: 'category' })
        .populate({ path: 'member' })
        .populate({ path: 'janr' })

    if (!kino && searchOne == [] && searchOne.name == '' && searchOne.name == null && searchOne.name == undefined) {
        res.redirect('/')
    }

    arr.push(season)
    arr.push(kino)


    res.status(200).json({ data: arr})
})