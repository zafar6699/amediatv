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

exports.getMemberId = asyncHandler(async (req, res, next) => {
    await Member.findById(req.params.id)
        .exec((error, data) => {
            if (error) {
                throw error
            } else {
                const img = data.image
                console.log(img)
            }
            
    })
})


// @description Create Category
// @route POST /api/category
// @access Private/(Admin or Publisher)
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
        image: `/public/uploads/members/${path.basename(compressedImageFileSavePath)}`
    })
    member.save()
        .then(() => {
            res.status(201).json({
                success: true,
                data: member
            })
        })
})

// @description delete single Category
// @route DELETE /api/category
// @access Private/Admin
exports.deleteMember = asyncHandler(async (req, res, next) => {

    await Member.findById(req.params.id)
        .exec(async (error, data) => {
            if (error) {
                res.send(error)
            } else {
                let poster1 = path.join(path.dirname(__dirname) + `/public/uploads/members`, data.image)
                fs.unlink(poster1, async (error) => {
                    if (error) {
                        console.log(error)
                    }
                })
                
                await Member.findByIdAndDelete(req.params.id)
            }
        })

    const category = await Member.findByIdAndDelete(req.params.id)
    if (!category)
        return next(new ErrorResponse(`Resourse not found with id of ${req.params.req.params.id}`, 404))
    res.status(200).json({ success: true, data: [] });
});


// @description edit single Category
// @route DELETE /api/category
// @access Private/Admin
exports.editMember = asyncHandler(async (req, res, next) => {
    const category = await Member.findByIdAndUpdate(req.params.id);

    category.name = req.body.name

    category
        .save({ validateBeforeSave: false })
        .then(() => {
            res.status(200).json({
                success: true,
                data: category
            })
        })
        .catch((error) => {
            res.status(400).json({
                success: true,
                data: error
            })
        })
});

exports.editPoster = asyncHandler(async (req, res, next) => {
   
        
    
    let compressedImageFileSavePath = path.join(__dirname, '../public/uploads/members', md5(new Date().getTime()) + '.jpg')
    await sharp(req.file.path).resize(200, 200).jpeg({
        quality: 60
    }).toFile(compressedImageFileSavePath, (error) => {
        if (error) {
            res.send(error)
        }
        fs.unlink(req.file.path, async (error) => {
            if (error) {
                res.send(error)
            }
        })
    })


    const category = await Member.findByIdAndUpdate(req.params.id)
    
    category.image = `/public/uploads/members/${path.basename(compressedImageFileSavePath)}`

    category
        .save({ validateBeforeSave: false })
        .then(() => {
            res.status(200).json({
                success: true,
                data: category
            })
        })
        .catch((error) => {
            res.status(400).json({
                success: true,
                data: error
            })
        })
})

