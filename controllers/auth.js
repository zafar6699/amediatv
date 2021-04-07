const User = require('../models/user');

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
        res.status(400).json({ success: false, data: 'Formani toldiring' });
    }
    const users = await User.findOne({ email: email }).select('password');
    if (!users) {
        res.status(404).json({ success: false, data: 'Foydalanuvchi topilmadi' });
    }
    const isMatch = await users.matchPassword(password);
    if (!isMatch) {
        res.status(404).json({ success: false, data: 'Parol topilmadi' });
    }
    const body = await User.findOne({ email: req.body.email })
    req.session.user = body
    req.session.save()
    // res.status(200).json({ success: true, data: body });
    res.redirect('/')

}
exports.getSession = async (req, res) => {
    const user = req.session.user
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
        tel: "+998" + req.body.tel
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
        res.status(401).json({ success: false, data: 'Password is incorrect'})
    }
    user.password = req.body.newPassword;
    await user.save();
    sendTokenResponse(user, 200, res);
}





