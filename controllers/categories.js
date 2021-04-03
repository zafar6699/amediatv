const Category = require('../models/category');
const {Products} = require('../models/product');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const Kino = require('../models/kino');
const Season = require('../models/season')





exports.getCategories = asyncHandler( async (req , res , next) => {
      const categories = await Category.find();
    res.status(200).json({success: true , count : categories.length , data: categories});
  });


exports.createCategory = asyncHandler( async (req , res , next) => {
    const category = await Category.create(req.body);
    res.status(201).json({success: true , data: category});
});


exports.getCategory = asyncHandler( async (req , res , next) => {
    const category = await Category.findById({_id: req.params.categoryId});
    if (!category) {
        res.status(201).json({success: true , data: category});
    }
    res.status(200).json({success: true , data: category});
});



exports.getQuery = asyncHandler(async (req, res) => {
    try{
        let resultQuery;
        let type = req.query.type
        if(type == 'kino'){
            resultQuery = await Kino.find({category: req.params.categoryId})
        }
        if(type == 'season'){
            resultQuery = await Season.find({category: req.params.categoryId})
        }
        res.status(200).json({
            success: true,
            count: resultQuery.length,
            data: resultQuery
        })

    }catch (error){
        if((type != 'kino') || type != 'season'){
            res.send(error)
        }
    }

})


