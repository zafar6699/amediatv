const User = require('../models/user')
const Jurnal = require('../models/jurnal')

exports.FillBalance = async (req, res) => {
    const user = req.session.user
    const candidate = await User.findOne({ uid: user.uid })
    const jurnal = new Jurnal({
        userID: candidate.uid, // 10000000
        amount: req.body.amount
    })

    await jurnal.save()
        .then(() => {
            return res.redirect(`https://pay.amediatv.uz/pay/payme/${jurnal.userID}/${jurnal.amount}/`)
        })
        .catch((error) => { return res.status(400).json({ success: false, data: error }) })
}



exports.checkUser = async (req, res) => {
    try {
        const user = await User.findOne({ uid: req.params.id })
            .select({ name: 1, balance: 1 })

        if (!user) {
            return res.status(404).json({
                success: false,
                data: 0
            })
        } else {
            return res.status(200).json({
                success: true,
                user: user
            })
        }

    } catch (e) {
        res.status(400).json({
            success: false,
            data: e
        })
    }
}

exports.saveData = async (req, res) => {
    const candidate = await User.findOne({ uid: req.body.userID })
    //console.log(candidate)
    const jurnal = new Jurnal({
        userID: candidate._id,
        amount: req.body.amount,
        type: req.body.type,
        status: req.body.status,
        date: req.body.date
    })

    await jurnal.save()
        .then(() => {

            return res.status(201).json({
                success: true,
                data: jurnal
            })

        })
        .catch((error) => {
            //      console.log(error)
            return res.status(400).json({
                success: false,
                data: error
            })
        })
    // const user = await User.findByIdAndUpdate(candidate._id)
    // console.log(candidate._id)
    // user.balance = req.body.amount + user.balance
    // user.save({ validateBeforeSave: false })
    // console.log('success')
}

exports.Events = async (req, res) => {
    const jurnal = await Jurnal.find()
        .populate(['userID'])
        .sort({ date: -1 })
    res.status(200).json({
        success: true,
        data: jurnal
    })
}

exports.checkOson = async (req, res) => {
    const token = 'AXBFbyL5s7L5FKAYYZnVvKx6vuad2CKsrbWckj7ngHhMhun7jA'
    try {
        if (req.headers.token === token) {
            if (req.body.method === "check") {
                const user = await User.findOne({ uid: req.body.account })
                if (!user) {
                    res.status(404).json({
                        success: false,
                        data: 'User not found'
                    })
                } else {
                    res.status(200).json({
                        success: true,
                        user
                    })
                }
            } else {
                res.status(400).json({
                    status: false,
                    data: 'Invalid method'
                })
            }
        } else {
            res.status(400).json({
                success: false,
                data: 'Invalid token'
            })
        }
    }
    catch (e) {
        res.status(400).json({
            success: false,
            data: e
        })
    }
}
exports.payOson = async (req, res) => {
    const token = 'AXBFbyL5s7L5FKAYYZnVvKx6vuad2CKsrbWckj7ngHhMhun7jA'
    try {
        if (req.headers.token === token) {
            if (req.body.method === 'pay') {
                // const token = req.headers.authorization
                // const me =  JWT.decode(token.slice(7,token.length))
                // const user = await User.findByIdAndUpdate({_id: user.id})
                const candidate = await User.findOne({ uid: req.body.account })
                //  console.log(candidate)
                //const user = await User.findByIdAndUpdate({_id: candidate._id})
                const oson = new Jurnal({
                    userID: candidate._id,
                    amount: req.body.amount,
                    type: 'Oson Payment System',
                    status: true
                })

                oson.save()
                    .then(async () => {
                        // let user = await User.findByIdAndUpdate({_id: candidate._id})
                        // user.balance += req.body.amount.parseInt()
                        // user.save({ validateBeforeSave: false })
                        //     .then(()=>{console.log("success")})
                        //     .catch((e)=> {console.log(e)})
                        res.status(201).json({

                            state: 1,
                            transaction_id: oson._id
                        })
                    })
                    .catch((error) => {
                        res.status(400).json({
                            success: false,
                            state: 0,
                            data: error
                        })
                    })
            } else {
                res.status(400).json({
                    status: false,
                    data: 'Invalid method'
                })
            }
        } else {
            res.status(400).json({
                success: false,
                data: 'Invalid token'
            })
        }
    }
    catch (e) {
        res.send(e)
    }
}
exports.osonStatus = async (req, res) => {
    const token = 'AXBFbyL5s7L5FKAYYZnVvKx6vuad2CKsrbWckj7ngHhMhun7jA'
    try {

    }
    catch (e) {
        res.send(e)
    }
}
