const path = require('path');
const fs = require('fs');
const sharp = require('sharp')
const jwt = require('jsonwebtoken')
const User = require('../models/user');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');


exports.createUser = asyncHandler( async (req , res , next) => {
  const user = await User.create(req.body);
  res.status(200).json({success: true , data: user});
});









