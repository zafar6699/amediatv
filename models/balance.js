const mongoose = require('mongoose')

const BalanceSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'Users',
        required: true
    },
    price: {
        type: mongoose.Schema.ObjectId,
        ref: 'Price',
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})
BalanceSchema.pre('save', async function (next) {
    const candidate = await this.model('Users').findByIdAndUpdate({ _id: this.user })
    const priceList = await this.model('Price').findById({ _id: this.price })
    const ostatok = candidate.balance - priceList.amount
    candidate.balance = ostatok

    if ((candidate.balance >= 0) && (priceList.amount > candidate.balance)) {
        candidate.status = 'user'
    }
    else {
        candidate.status = 'vip'
    }
   

    candidate.save({ validateBeforeSave: false })
    next();
})
module.exports = mongoose.model('Balance', BalanceSchema)