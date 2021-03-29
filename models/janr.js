const mongoose = require('mongoose');

const janrSchema = new mongoose.Schema({
    nameuz: {
        type: String,
        required: [true , 'Please add an uzbek category name'],
        minlength: [3 , 'Category name should include minimum 3 characters'],
        maxlength: [255 , 'Category name should include maximum 255 characters '],
        trim: true
    },
    nameru: {
        type: String,
        required: [true , 'Please add a russian category name'],
        minlength: [3 , 'Category name should include minimum 3 characters'],
        maxlength: [255 , 'Category name should include maximum 255 characters '],
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },



    status:{
        type: Boolean, default: true
    }
})

module.exports = mongoose.model('janr' , janrSchema);
