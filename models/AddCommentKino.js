const mongoose = require('mongoose')

const addCommentSchema = mongoose.Schema({
 message: {
  type: String, required: true
 },
 prevComment: {
  type: mongoose.Schema.ObjectId,
  required: true,
  ref: 'comment'
 },
 userID: {
  type: mongoose.Schema.ObjectId,
  required: true,
  ref: 'Users'
 },
 date: {
  type: Date,
  default: Date.now()
 }
})
module.exports = mongoose.model('OtherCommenetKino', addCommentSchema)