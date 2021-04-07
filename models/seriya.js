const mongoose = require('mongoose')
const seriyaSchema = new mongoose.Schema({
    name: {
        uz: {type: String, required: true},
        ru: {type: String, required: true}
    },
    video: {type: String, required: true},
    season: {type: mongoose.Schema.ObjectId, ref: 'season', required: true},
    slug: {type: String, unique: true, lowercase: true},
    url: { type: String, required: true },
    tags: {type: String},
    length: {type: String, required: true},
    date: {type: Date, default: Date.now()}
})
module.exports = mongoose.model('seriya', seriyaSchema)
