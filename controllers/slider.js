const Slider = require('../models/slider');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');

exports.addSlider = asyncHandler(async (req, res, next) => {
 const slider = await Slider.create(req.body)
 res.status(201).json({
  success: true,
  slider
 })

})



exports.getSlidersForAdminPage = asyncHandler(async (req, res, next) => {
 let sliders = await Slider.find()
  .sort({ date: -1 })
  .populate(
   {
    path: 'kino',
   }
  )
  .populate(
   {
    path: 'serial',
   }
  )
 //.populate(['kino','serial'])

 res.status(200).json({
  success: true,
  data: sliders
 })
})