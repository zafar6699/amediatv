const path = require('path');
const fs = require('fs');
const sharp = require('sharp')
const jwt = require('jsonwebtoken')
const User = require('../models/user');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const md5 = require('md5')


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
  // admin.photo = path.basename(compressedFile)
  admin.photo = `/public/uploads/${req.file.filename}`
  admin.save()
      .then(() => {
        res.redirect('/profile')
      })
      .catch((error) => {
          res.render('./main/404Auth', {
              title: "Error", layout: 'error',
              user: req.session.user,
              lang: req.session.ulang,
              janr
          })
      })

  req.session.user.photo = admin.photo        
  req.session.save()

}










