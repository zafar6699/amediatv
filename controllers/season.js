const Season = require('../models/season')
const Seriya = require('../models/seriya')
const SeriyaCommnent = require('../models/commentSerial')
const asyncHandler = require('../middlewares/async')
const Janr = require("../models/janr")
const path = require('path');
const sharp = require('sharp')
const JWT = require('jsonwebtoken');
const User = require('../models/user')
const SeasonComment = require('../models/AddCommentSeason')


// Season Controller
exports.addSeason = asyncHandler(async (req, res, next) => {
    const files = req.files;
    const urls = [];
    const thumb = [];

    for (const file of files) {
        const { filename } = file;
        urls.push(`/uploads/cinema/org/${filename}`)
        thumb.push(`/uploads/cinema/thumb/${filename}`)
        await sharp(path.join(path.dirname(__dirname) + `/public/uploads/cinema/org/${filename}`)).resize(1440, 600)
            .jpeg({
                quality: 60
            })
            .toFile(path.join(path.dirname(__dirname) + `/public/uploads/cinema/thumb/${filename}`), (err) => {
                if (err) {
                    throw err
                }

            })
    }




    const category = [];
    const translator = [];
    const tarjimon = [];
    const janrs = [];
    const tayming = [];


    for (const cat of req.body.category) {
        const catt = cat
        category.push(catt)
    }
    for (const member of req.body.translator) {
        const mem = member;
        translator.push(mem)
    }
    for (const key of req.body.tarjimon) {
        const tarj = key;
        tarjimon.push(tarj)
    }
    for (const janr of req.body.janr) {
        const ja = janr;
        janrs.push(ja)
    }
    for (const tay of req.body.tayming) {
        const taym = tay
        tayming.push(taym)
    }




    const season = new Season({
        name: {
            uz: req.body.nameuz,
            ru: req.body.nameru
        },
        screens: {
            thumb: thumb.slice(1, urls.length),
            original: urls.slice(1, urls.length)
        },
        image: urls[0],
        description: {
            uz: req.body.descriptionuz,
            ru: req.body.descriptionru,
        },
        year: req.body.year,
        num: req.body.num,
        category: category,
        translator: translator,
        tarjimon: tarjimon,
        video: req.body.video,
        rejissor: req.body.rejissor,
        length: req.body.length,
        studia: req.body.studia,
        tayming: tayming,
        price: req.body.price,
        janr: janrs,
        country: req.body.country,
        tags: req.body.tags,
        slug: (Math.floor(Math.random() * 9999999999999)).toString()
    })
    season.save()
        .then(() => {
            res.status(201).json({
                success: true,
                data: season
            })
        })
        .catch((error) => {
            res.status(400).json({
                success: false,
                data: error
            })
        })
})
exports.getAllSeason = asyncHandler(async (req, res, next) => {

    const season = await Season.find()
        .sort({ date: -1 })
        .select({ name: 1, category: 1, image: 1, rating: 1, janr: 1, price: 1, date: 1, num: 1 })
        .populate({ path: 'category', select: 'nameuz' })
    const janr = await Janr.find().sort({ createdAt: - 1 })

    res.render("./main/serial", {
        janr,
        serial: season,
        title: "AmediaTV.uz",
        user: req.session.user, layout: 'layout'
    })

    // res.json(season)
})
exports.getByIdSeason = asyncHandler(async (req, res, next) => {
    const comment = await SeriyaCommnent.find({ season: req.params.id })
        .sort({ date: -1 })
        .populate(['user'])
    const seasonCOM = await SeasonComment()
    
    let janr = await Janr.find()
    const seria = await Seriya.find({ season: req.params.id })
        .populate(['season'])
    const season = await Season.findById(req.params.id)
        .populate(['category', 'janr', 'translator', 'tayming', 'tarjimon', 'seriya'])
    if (season.price == 'free' || season) {
        res.render("./main/oneserial", {
            title: "AmediaTV.uz",
            layout: 'layout',
            user: req.session.user,
            lang: req.session.ulang,
            janr,
            serial: season,
            seria,  
            comment
        })
    } else {
        const me = req.session.user
        //  registrtasiydan otmasa va serial pullik bolsa serialni ichiga kirmays=di
        if (!me && season.price === 'selling') {
            res.redirect('/')
        }
        //  registrtasiydan otmasa va serial tekin bolsa serialni ichiga kirmays=di
        else if (!me && season.price === 'free') {
            res.render("./main/oneserial", {
                title: "Serial",
                layout: 'layout',
                user: req.session.user,
                lang: req.session.ulang,
                janr,
                serial: season,
                seria, comment
            })
        }
        // user vip bolmasa va serial pullik bolsa serialga kirmaydi
        else if (me.status !== 'vip' && season.price === 'selling') {
            res.render('./main/notVip', {
                title: "401", layout: 'error',
                user: req.session.user,
                lang: req.session.ulang,
                janr, seria, comment
            })
            // user vip bolsa va serial pullik bolsa serialga kiradi
        } else if (me.status === 'vip' && season.price === 'selling') {
            res.render("./main/oneserial", {
                title: "AmediaTV.uz",
                layout: 'layout',
                user: req.session.user,
                lang: req.session.ulang,
                janr,
                serial: season,
                seria, comment
            })
        }
    }
    
})

exports.addSeriya = asyncHandler(async (req, res, next) => {
    const seriya = new Seriya({
        name: {
            uz: req.body.nameuz,
            ru: req.body.nameru
        },
        length: req.body.length,
        url: req.body.url,
        video: req.body.video,
        season: req.body.season,
        slug: (Math.floor(Math.random() * 9999999999999)).toString(),
        // tags: req.body.tags
    })
    seriya.save()
        .then(() => {
            res.status(201).json({
                success: true,
                data: seriya
            })
        })
        .catch((error) => {
            res.status(400).json({
                success: false,
                data: error
            })
        })
})