const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const Member = require('../models/members')
const fs = require('fs');
const sharp = require('sharp')
const path = require('path');
const md5 = require('md5');


exports.allMembers = asyncHandler(async (req, res, next) => {
    const members = await Member.find();
    res.status(200).json({ success: true, count: members.length, data: members });
});

// exports.getMemberId = asyncHandler(async (req, res, next) => {
//     await Member.findById({_id: req.params.id})
//         .exec((error, data) => {
//             if (error) {
//                 throw error
//             } else {
//                 const img = data.image
//                 console.log(img)
//             }
            
//     })
// })

exports.getMemberId = asyncHandler(async (req, res, next) => {
    const member = await Member.findById({ _id: req.params.id })
    if(!member) {  res.status(200).json({ success: true, count: member.length, data: member }); }
})




exports.addMember = asyncHandler(async (req, res, next) => {

    let compressedImageFileSavePath = path.join(__dirname, '../public/uploads/members', md5(new Date().getTime()) + '.jpg')
    await sharp(req.file.path).resize(200, 200).jpeg({
        quality: 60
    }).toFile(compressedImageFileSavePath, (error) => {
        if (error) {
            res.send(error)
        }
        // original rasm o'chadi
        fs.unlink(req.file.path, async (error) => {
            if (error) res.send(error);
        })

    })

    const member = new Member({
        name: req.body.name,
        image: path.basename(compressedImageFileSavePath)
    })
    member.save()
        .then(() => {
            res.status(201).json({
                success: true,
                data: member
            })
        })
})



