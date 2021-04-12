const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        minlength: [3, 'Name can\'t be shorter than 3 characters'],
        maxlength: [255, 'Name can\'t be more than 255 characters'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email'],
        unique: [true, 'Your email has already been registered'],
        // trim: true,
        // lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: [3, 'Password can\'t be shorter than 6 characters'],
        maxlength: [1024, 'Name can\'t be more than 1024 characters'],
        // trim: true,
        // select: false
    },
    tel: {
        type: Number,
        maxlength: 9
    },
    role: {
        type: String,
        enum: ['user', 'publisher', 'admin'],
        default: 'user'
    },
    status: {
        type: String,
        enum: ['user', 'vip'],
        default: 'user'
    },
    balance: {
        type: Number,
        default: 0
    },
    uid: { type: Number, required: true, unique: true },
    photo: String,
    balanceJournals: {type: String},
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}



const User = mongoose.model('Users', userSchema);

module.exports = User;
