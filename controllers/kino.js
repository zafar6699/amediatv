const Kino = require('../models/kino')
const asyncHandler = require('../middlewares/async')
const slugify = require('slugify');
const ErrorResponse = require('../utils/errorResponse');
const Comment = require('../models/comment')
const fs = require('fs');
const sharp = require('sharp')
const path = require('path');
const JWT = require('jsonwebtoken');
const User =  require('../models/user')
const md5 = require('md5');
const Janr = require("../models/janr")


exports.addCinema = asyncHandler(async (req,res,next) => {
    const files = req.files;
    const urls = [];
    const thumb=[];
    for (const file of files) {
        const { filename } = file;
        urls.push(`/uploads/cinema/org/${filename}`)
        thumb.push(`/uploads/cinema/thumb/${filename}`)
        await sharp(path.join(path.dirname(__dirname) + `/public/uploads/cinema/org/${filename}`) ).resize(100,100)
            .jpeg({
                quality: 60
            })
            .toFile(path.join(path.dirname(__dirname) + `/public/uploads/cinema/thumb/${filename}`), (err)=>{
                if(err) {
                    throw err
                }
                let thumbb = path.join(path.dirname(__dirname) + thumb[0])
                fs.unlink(thumbb, async (error) => {
                    if (error) {
                        console.log(error)
                    }
                })
            })
    }
  
    
    const category=[];
    const translator = [];
    const tarjimon = [];
    const janrs = [];
    const tayming = [];


    for(const cat of req.body.category){
        const catt = cat
        category.push(catt)
    }
    for (const member of req.body.translator){
        const mem = member;
        translator.push(mem)
    } 
    for (const key of req.body.tarjimon){
        const tarj = key;
        tarjimon.push(tarj)
    }
    for (const janr of req.body.janr){
        const ja = janr;
        janrs.push(ja)
    }
    for(const tay of req.body.tayming){
        const taym = tay
        tayming.push(taym)
    }

  
     const kino = new Kino({
         name:{
            uz: req.body.nameuz,
            ru: req.body.nameru
         },
         description:{
             uz: req.body.descriptionuz,
             ru: req.body.descriptionru
         },
         screens: {
             thumb: thumb.slice(1, urls.length),
             original: urls.slice(1, urls.length)
         },
         image: urls[0],
         rejissor: req.body.rejissor,
         studia: req.body.studia,
         length: req.body.length,
         tayming: tayming,
         category: category,
         translator: translator,
         tarjimon: tarjimon,
         janr: janrs,
         video: req.body.video,
         price: req.body.price,
         slug: (Math.floor(Math.random()*9999999999999)).toString(),
         year: req.body.year,
         country: req.body.country,
         tags: req.body.tags

         //status: req.body.status,


    })
    kino.save({ validateBeforeSave: false })
        .then(()=>{
            res.status(201).json({
                success: true,
                data: kino
            })
        })
        .catch((error) => {
            res.send(error)
        })
})
exports.getAll = asyncHandler(async (req,res,next)=>{
    const kino = await Kino.find()
        .sort({date: -1})
        .select({name: 1, category: 1, image: 1, rating: 1, price: 1,date: 1})
        .populate({path: 'category', select: 'nameuz'})

    res.status(200).json({
        success: true,
        data: kino
    })
})

exports.sortByCat = asyncHandler(async (req,res,next)=>{
    const pageNumber = req.query.page
    const limit = req.query.limit
    let productLimit
    if(!limit){
        productLimit = 20
    } else {productLimit = limit}


    let reqQuery = { ...req.query };
    // Create query String
    let queryStr = JSON.stringify(reqQuery);
    const kino = await Kino.find(JSON.parse(queryStr))

        .skip((pageNumber - 1 )* productLimit)
        .limit(productLimit)
        .sort({date: -1})
        .select({name: 1, category: 1,type: 1, image: 1, year: 1, janr: 1})
        .populate({path: 'category', select: 'nameuz'})

    res.status(200).json({
        success: true,
        data: kino
    })
})

exports.getById = async (req, res) => {
    // const kino = await Kino.findById(req.params.id)
    // .populate({path: 'category'})
    // .populate({path: 'janr'})
    // .populate({path: 'tarjimon'})
    // const janr = await Janr.find().sort({createdAt: - 1})

    // // res.json(kino)

    // res.render("./main/kino", {
    //     kino,
    //     janr,
    //     title: "Kino",
    //     user: req.session.user,
    // })









    
    let janr = await Janr.find()
   
    const kino = await Kino.findById({_id: req.params.id})
        .populate(['category', 'janr', 'translator', 'tayming', 'tarjimon', 'seriya'])
    if (kino.price === 'free') {
        res.render("./main/kino", {
            title: "Kino",
            layout: 'layout',
            user: req.session.user,
            lang: req.session.ulang,
            janr,
            kino
        })
    } else {
       
        const user = req.session.user
        const me = await User.findOne({ _id: user._id })
        if (me.status !== 'vip' && kino.price === 'selling') {
            res.render('./main/notVip', {
                title: "Error", layout: 'error',
                user: req.session.user,
                lang: req.session.ulang,
                janr
            })
        } else if (me.status === 'vip' && kino.price === 'selling') {
            
            res.render("./main/kino", {
                title: "Kino",
                layout: 'layout',
                user: req.session.user,
                lang: req.session.ulang,
                janr,
                kino
            })
        }
    }






}


