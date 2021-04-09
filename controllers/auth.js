const User = require('../models/user');
const Balance = require('../models/balance');

exports.register = async (req, res, next) => {
    const candidate = await (await User.findOne().sort({ createdAt: -1 }))
    const uid = candidate ? candidate.uid + 1 : 10000000
    const { name, email, password, balance } = req.body;
    let user = await User.create({
        name,
        email,
        password,
        uid,
        balance
    })
    await user.save()
        .then(() => {
            // res.status(201).json({ success: true, data: user });
            res.redirect('/')
        })
        .catch((error) => {
            // res.status(400).json({ success: false, data: error });
            res.status(400).json({ success: false, data: 'Formani toldiring' });
        })

}
exports.login = async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) {
        res.render('./main/404Auth', {title: '404',layout: 'error'})
    }
    const users = await User.findOne({ email: email }).select('password');
    if (!users) {
        res.render('./main/404Auth', {title: '404',layout: 'error'})
    }
    const isMatch = await users.matchPassword(password);
    if (!isMatch) {
        res.render('./main/404Auth', {title: '404',layout: 'error'})
    }
    const body = await User.findOne({ email: req.body.email })

    const balance = await Balance.find({ user: body._id }).sort({ createdAt: -1 }).skip(0).limit(1)
    req.session.balance = balance
    req.session.user = body
    req.session.save()
    res.redirect('/')

}
exports.getSession = async (req, res) => {
    const user = req.session
    res.status(200).json({ success: true, data: user });
}
exports.logout = async (req, res) => {
    req.session.destroy()
    res.clearCookie('connect.sid')
    res.redirect('/')
}





exports.UpdateDetails = async (req, res, next) => {
    const FieldsToUpdate = {
        name: req.body.name,
        email: req.body.email,
        // tel: "+998" + req.body.tel
    }
    const user = await User.findByIdAndUpdate(req.user.id, FieldsToUpdate, {
        new: true,
        runValidators: true
    });
    res.status(201).json({ success: true, data: user });
}





exports.UpdatePassword = async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');

    if (!(await user.matchPassword(req.body.currentPassword))) {
        res.status(401).json({ success: false, data: 'Password is incorrect' })
    }
    user.password = req.body.newPassword;
    await user.save();
    sendTokenResponse(user, 200, res);
}





