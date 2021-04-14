const Category = require('../models/category');
const { Products } = require('../models/product');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const Kino = require('../models/kino');
const Season = require('../models/season')
const Janr = require('../models/janr')





exports.getCategories = asyncHandler(async (req, res, next) => {
    const categories = await Category.find();
    res.status(200).json({ success: true, count: categories.length, data: categories });
});


exports.createCategory = asyncHandler(async (req, res, next) => {
    const category = await Category.create(req.body);
    res.status(201).json({ success: true, data: category });
});


exports.getCategory = asyncHandler(async (req, res, next) => {
    const category = await Category.findById({ _id: req.params.categoryId });
    if (!category) {
        res.status(201).json({ success: true, data: category });
    }
    res.status(200).json({ success: true, data: category });
});



exports.getQuery = asyncHandler(async (req, res) => {
    // try {
    //     let resultQuery;
    //     let type = req.query.type
    //     if (type == 'kino') {
    //         resultQuery = await Kino.find({ category: req.params.categoryId })
    //     }
    //     if (type == 'season') {
    //         resultQuery = await Season.find({ category: req.params.categoryId })
    //     }
    //     res.status(200).json({
    //         success: true,
    //         count: resultQuery.length,
    //         data: resultQuery
    //     })

    // } catch (error) {
    //     if ((type != 'kino') || type != 'season') {
    //         res.send(error)
    //     }
    // }

    const array = []
    const janr = await Janr.find()
    const kino = await Kino.find({ year: req.params.year }).sort({date: -1})
    const season = await Season.find({ year: req.params.year }).sort({date: -1})

    array.push(kino)
    array.push(season)

    if (!kino && !season) {
        res.render('./main/404Auth', { title: '404', layout: 'error' })
    }
   
    res.render("./main/yearSort", {
        
        title: "AmediaTV.uz",
        user: req.session.user,
        lang: req.session.ulang,
        lang: req.session.ulang,
        layout: "./layout",
        janr,
        array: array
    })


})

exports.getByJanr = asyncHandler(async (req, res) => {
    const array = []
    const janr = await Janr.find()
    const kino = await Kino.find({ janr: req.params.id }).sort({date: -1})
    const season = await Season.find({ janr: req.params.id }).sort({date: -1})

    array.push(kino)
    array.push(season)

    if (!kino && !season) {
        res.render('./main/404Auth', { title: '404', layout: 'error' })
    }

    

    res.render("./main/janrSort", {
        
        title: "AmediaTV.uz",
        user: req.session.user,
        lang: req.session.ulang,
        lang: req.session.ulang,
        layout: "./layout",
        janr,
        array: array
    })


})


