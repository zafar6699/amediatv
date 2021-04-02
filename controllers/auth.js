const User = require('../models/user');

exports.register = async (req, res, next) => {
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
}

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    // Validate email & password
    if (!email || !password) {
        res.render('./main/404', {title: '404', layout: 'error'})
    }

    // check for user
    const user = await User.findOne({ email: email }).select('+password');

    if (!user) {
        res.render('./main/401', {title: '401', layout: 'error'})
    }
    const users = await User.findOne({ email: email }).select('password');
    if (!users) {
        res.render('./main/404', {title: '404', layout: 'error'})
    }
    const body = await User.findOne({ email: email })
    req.session.user = body
    req.session.save()

    res.redirect('/')
};


exports.logout = async (req, res) => {
    req.session.destroy()
    res.clearCookie('connect.sid')
    res.redirect('/')
  }





