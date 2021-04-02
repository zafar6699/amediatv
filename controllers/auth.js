const User = require('../models/user');
const asyncHandler = require('../middlewares/async');

exports.register = asyncHandler(async (req, res, next) => {
    const candidate = await (await User.findOne().sort({createdAt: -1}))
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

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    // Validate email & password
    if (!email || !password) {
        redirect()
    }

    // check for user
    const user = await User.findOne({ email: email }).select('+password');

    if (!user) {
        return next(new ErrorResponse('Invalid credentials ', 401));
    }
    const users = await User.findOne({ email: email }).select('password');
    if (!users) {
      res.render('./404', {title: '404', layout: 'layout'})
    }

    res.redirect('/')
});





