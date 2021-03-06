const User = require('../models/user');
const Balance = require('../models/balance');
const fs = require('fs')
const sharp = require('sharp')
const path = require('path');
const md5 = require('md5');


exports.register = async (req, res, next) => {
    const candidate = await (await User.findOne().sort({ createdAt: -1 }))
    const uid = candidate ? candidate.uid + 1 : 10000000
    const { name, email, password } = req.body;
    let user = await User.create({
        name,
        email,
        password,
        uid
    })
    await user.save()
        .then(() => {
            res.redirect('/')
        })
        .catch((error) => {
            res.render('./main/sorry', {
                title: "Error", layout: 'error',
                // user: req.session.user,
                // lang: req.session.ulang,
                // janr
            })
        })

}
exports.login = async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) {
        // res.redirect('/')
        res.status(401).json({
            success: true, data: '401'
        })
        
        
    }
    const users = await User.findOne({ email: email }).select('password');
    if (!users) {
        // res.redirect('/')
        res.status(401).json({
            success: true, data: '401'
        })
        
    }
    const isMatch = await users.matchPassword(password);
    if (!isMatch) {
        // res.redirect('/')
        res.status(401).json({
            success: true, data: '401'
        })
        
    }

    /* Agar har safar profilga kirganda userni trafigi tugasa "status: user" boladi. 
    Aks holda "vip" qiladi */
    const body = await User.findOne({ email: req.body.email })

    const today = new Date();
    const Next = new Date(body.balanceJournals)
    if (today > Next) {
        body.status = "user"
    } else if(today < Next){
        body.status = "vip"
    }
    await body.save({validateBeforeSave: false})
    const balance = await Balance.find({ user: body._id }).sort({ createdAt: -1 }).skip(0).limit(1)
    req.session.balane = balance
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
exports.updateFile = async (req, res) => {
    const user = req.session.user
    const admin = await User.findByIdAndUpdate({ _id: user._id })
    let compressedFile = path.join(__dirname, '../public/uploads', md5(new Date().getTime()) + '.jpg')
    await sharp(req.file.path)
        .resize(500, 500)
        .jpeg({ quality: 100 })
        .toFile(compressedFile, (error) => {
            if (error) {
                res.send(error)
            }
            fs.unlink(req.file.path, async (error) => {
                if (error) {
                    throw error
                }
            })
        })
    admin.photo = path.basename(compressedFile)
    admin.save()
        .then(() => {
            res.redirect('/profile')
        })
        .catch((error) => {
            res.render('./main/404Auth', {
                title: "AmediaTV.uz", layout: 'error',
                user: req.session.user,
                lang: req.session.ulang,
                janr
            })
        })

    req.session.user.photo = admin.photo        
    req.session.save()

}

exports.UpdateDetails = async (req, res, next) => {
    const user = req.session.user
    const admin = await User.findByIdAndUpdate({ _id: user._id });
    admin.name = req.body.name
    admin.email = req.body.email
    await admin.save()
        .then(() => {
            res.redirect('/profile')
            // res.json(admin)
        })
        .catch((error) => {
            res.render('./main/404Auth', {
                title: "AmediaTV.uz", layout: 'error',
                user: req.session.user,
                lang: req.session.ulang,
                janr
            })
            // res.json(error)
        })

    req.session.user = admin
    req.session.save()
}
exports.UpdatePassword = async (req, res, next) => {
    const user = req.session.user
    const admin = await User.findByIdAndUpdate({ _id: user._id });
    admin.password = req.body.password
    await admin.save()
        .then(() => {
            res.redirect('/profile')
            // res.json(admin)
        })
        .catch((error) => {
            res.render('./main/404Auth', {
                title: "AmediaTV.uz", layout: 'error',
                user: req.session.user,
                lang: req.session.ulang,
                janr
            })
            // res.json(error)
        })

    req.session.user = admin
    req.session.save()
}





