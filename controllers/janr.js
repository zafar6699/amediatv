const Janr = require('../models/janr');
const {Products} = require('../models/product');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');

exports.getJanrs =  async (req , res , next) => {
    const janr = await Janr.find();
    // res.render("/", { janr: janr })
    res.status(201).json({success: true , data: janr});
}


exports.createJanr = asyncHandler( async (req , res , next) => {
    const janr = await Janr.create(req.body);
    res.status(201).json({success: true , data: janr});
});

exports.getJanr = asyncHandler( async (req , res , next) => {
    const janr = await Janr.findById({_id: req.params.id});
    if (!janr) {
        res.status(404).json({success: false, data: "Not Found"})
    }
    // res.render("./main/onejanr")
    res.status(201).json({success: true , data: janr});
});
exports.getByJanr = async (req, res) => {
    const janrone = await Janr.findById({_id: req.params.id});

    const category = await Category.find()

    let sortKino = []

    
     category.forEach(async (element) => {
        let s = await Kino.find({ 
            category: { $all: [element._id]}, 
            janr: { $all: [req.params._id] } 
        }).select({name: 1, image: 1});
        sortKino.push(s);        
    });

    const janr = await Janr.find();

    res.render("./main/onejanr", {
        janr,
        title: "OneJanr",
        layout: 'layout',
        user: req.session.user,
        lang: req.session.ulang,
        
    })   
}
