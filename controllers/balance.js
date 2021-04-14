const Balance = require('../models/balance')
const PriceList = require('../models/priceList')
const User = require('../models/user')
const jwt = require('jsonwebtoken');


exports.addBalance = async (req, res, next) => {
    // const token = req.headers.authorization
    // const user = jwt.decode(token.slice(7, token.length))

    const user = req.session.user

    const price = req.body.price;

    let priceList = await PriceList.findById({ _id: price })
    const today = new Date();
    let endDate;
    let ress;
    // 12-2-20201
    switch (priceList.type) {
        case '1':
            // ress = new Date(today.getTime() + (1 * 31 * 24 * 60 * 60 * 1000))
            ress = new Date(today.getTime() + (3 * 60 * 1000)) // 3 minutlik tarif olish uchun 
            endDate = ress.toISOString()
            break;
        case '3':
            ress = new Date(today.getTime() + (3 * 31 * 24 * 60 * 60 * 1000))
            endDate = ress.toISOString()
            break;
        case '6':
            ress = new Date(today.getTime() + (6 * (30.40) * 24 * 60 * 60 * 1000))
            endDate = ress.toISOString()
            break;
        case '10':
            ress = new Date(today.getTime() + (12 * (30.40) * 24 * 60 * 60 * 1000))
            endDate = ress.toISOString()
            break;
    }
    const candidate = await User.findById({ _id: user._id })
    if (!priceList) {
        return res.send('Bunday tarif mavjud emas')
    } else {
        if (candidate.balance > 0 && candidate.balance >= priceList.amount) {
            const balanseJournal = new Balance({
                user: user._id,
                price: price,
                endDate: endDate,
                status: true
            })
            balanseJournal.save()

            const candidates = await User.findByIdAndUpdate({ _id: user._id })
            const ostatok = candidates.balance - priceList.amount
            candidates.balance = ostatok


            if ((candidates.balance >= 0) && (priceList.amount > candidates.balance)) {
                candidates.status = 'user'
            }
            else if ((candidate.balance >= 0) && (priceList.amount <= candidate.balance)) {
                candidates.status = 'vip'
            }


            candidates.balanceJournals = balanseJournal.endDate
            candidates.save()


            req.session.user.balance = candidates.balance = ostatok
            req.session.user.status = "vip"
            req.session.user.balanceJournals = balanseJournal.endDate
            req.session.save()




            res.redirect('/profile')
        } else {
            req.session.user.status = "user"
            req.session.save()
            res.redirect('/profile')
            // res.status(402).json({
            //     status: false,
            //     data: 'Mablag` yetarli emas'
            // })
        }

    }
}

exports.getBalances = async (req, res, next) => {
    const balanseJournal = await Balance.find()
        .populate(['user', 'price'])
        .sort({ date: -1 })
    res.status(200).json({
        success: true,
        data: balanseJournal
    });
}
