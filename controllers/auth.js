const JWT = require('jsonwebtoken')
const User = require('../models/user');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const Balance = require('../models/balance')

// @description Register
// @route GET /api/auth/register
// @access Public
exports.register = asyncHandler(async (req, res, next) => {
    const candidate = await (await User.findOne().sort({createdAt: -1}))
    // console.log(candidate)
    const uid = candidate ? candidate.uid + 1 : 10000000
    const { name, email, password } = req.body;
    let user = await User.create({
        name,
        email,
        password,
        uid
    });
    res.status(201).json({ success: true, data: user });
});


exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
        return next(new ErrorResponse('Please provide email and password', 400));
    }

    // check for user
    const user = await User.findOne({ email: email }).select('+password');

    if (!user) {
        return next(new ErrorResponse('Invalid credentials ', 401));
    }

    //check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
        return next(new ErrorResponse('Invalid credentials ', 401));
    }

    sendTokenResponse(user, 200, res);
});


exports.getMe = asyncHandler(async (req, res, next) => {

    try{
        const token = req.headers.authorization
        const my = JWT.decode(token.slice(7, token.length))
        const user = await User.findOne({ _id: my.id })
        res.status(200).json({ success: true, data: user });
    } catch (e){
        console.log(e)
    }
});


const sendTokenResponse = (user, statusCode, res) => {
    // Create token
    const token = user.getSignedJWT();

    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    };
    res.status(statusCode)
        .cookie('token', token, options)
        .json({ success: true, token });
}





