const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    message : {
        type: String,
        required: [true , 'Please add a product message'],
        trim: true
    },
    kinoId : {
        type : mongoose.Schema.ObjectId,
        ref: 'kino'
    },

    user : {
        type : mongoose.Schema.ObjectId,
        required : true,
        ref: 'Users'
    },
    date :  {
        type: Date,
        default:  Date.now()
    }
});

module.exports = mongoose.model('comment' , commentSchema);
