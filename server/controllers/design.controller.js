const Design = require('../models/design.model')
const Challenge = require('../models/challenge.model')
const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const cloudinary = require('cloudinary').v2
// const Designs = require('../models/design/model')

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
})
let streamifier = require('streamifier')

const addDesignToChallenge = (challengeId, design) => {
    return Challenge.findByIdAndUpdate(challengeId, 
        { $push: { submissions: design._id }}, 
        { new:true, useFindAndModify: false }
    )
}

const addDesignToUser = (userId, design) => {
    return User.findByIdAndUpdate(userId, 
        { $push: { submissions: design._id }}, 
        { new:true, useFindAndModify: false }
    )
}

const uploadToCloudinary = (file) => {
    return new Promise((resolve, reject) => {
        let cld_upload_stream = cloudinary.uploader.upload_stream(
            { folder: "design-a-thon", public_id: file.originalname },
            (error, result) => {
                if (error) reject(error)
                else resolve(result)
            }
        )
        streamifier.createReadStream(file.buffer).pipe(cld_upload_stream)
    })
}
cloudinary.uploader.destroy

module.exports = {
    createNewDesign: async (req, res) => {
        try{
            const result = await uploadToCloudinary(req.file)
            req.body.image = result.url
            const decodedJwt = jwt.decode(req.cookies.userToken, { complete: true })
            req.body.userId = decodedJwt.payload._id
            const design = await Design.create(req.body)
            const challenge = await addDesignToChallenge(design.challenge, design._id)
            const designer = await addDesignToUser(design.designer, design._id)
            res.status(201).json({design:design, challenge:challenge, user:designer})
        }
        catch(err){
            res.status(500).json(err)
        }
    },


    findAllDesigns : async (req, res) => {
        try{
            const designs = await Design.find().populate('designer')
            res.status(200).json(designs)
        }
        catch(err){
            res.status(500).json(err)
        }
    }


}


// module.exports.findAllByUser = (req, res) => {
//     Design.find({$or:[{designer: req.params.id}, {voters: {$elemMatch: req.params.id}}]})
//         .then((allDesigns) => {
//             res.status(200).json({ designs: allDesigns })
//         })
//         .catch((err) => {
//             res.status(500).json({ message: 'Something went wrong', error: err })


//         })
// }

module.exports.findOneDesign = (req, res) => {
    Design.findOne({ _id: req.params.id })
        .then(oneDesign => {
            res.status(200).json({ design: oneDesign })
        })
        .catch((err) => {
            res.status(500).json({ message: 'Something went wrong', error: err })
        });}


// module.exports.updateExistingDesign = (req, res) => {
//     const result = uploadToCloudinary(req.file);
//     req.body.image = result.url;
//     Design.findOneAndUpdate(
//         { _id: req.params.id },
//         req.body,
//         { new: true, runValidators: true }
//         )
//         .then(updatedDesign => {
//             console.log("We made it!!!!")
//             res.status(200).json({ user: updatedDesign })
//             })
//         .catch((err) => {
//                 res.status(500).json({ message: 'Something went wrong', error: err })
//             })
//         },

module.exports.deleteAnExistingDesign = (req, res) => {
    Design.deleteOne({ _id: req.params.id })
        .then(result => {
            res.status(200).json({ result: result })
            })
        .catch((err) => {
            res.status(500).json({ message: 'Something went wrong', error: err })
            })
        }






