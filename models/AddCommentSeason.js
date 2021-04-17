const mongoose = require('mongoose')

const AddCommentSchema = mongoose.Schema({
 message: {
  type: String, required: true
 },
 prevComment: {
  type: mongoose.Schema.ObjectId,
  required: true,
  ref: 'commentSeriya'
 },
 season: {
  type: mongoose.Schema.ObjectId,
  required: true,
  ref: 'season'
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
module.exports = mongoose.model('OtherCommenet', AddCommentSchema)