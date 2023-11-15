
const Designs = require('../models/design.model');
const cloudinary = require('cloudinary').v2;
const jwt = require('jsonwebtoken')

const Design = require('../models/design.model')
const jwt = require('jsonwebtoken')
const cloudinary = require('cloudinary').v2


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
});
let streamifier = require('streamifier');


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
            // console.log('LINE 58',decodedJwt.payload)
            req.body.userId = decodedJwt.payload._id
            // console.log('LOOK AT THIS LINE',req.body)
            const design = await Designs.create(req.body)
            res.status(201).json(design)
        }
        catch(err){
            res.status(500).json(err)
        }
    },


    findAllDesigns : async (req, res) => {
        try{
            const designs = await Designs.find().populate('user')
            res.status(200).json(designs)
        }
        catch(err){
            res.status(500).json(err)
        }
    },

module.exports.findAllDesigns = (req, res) => {
    Design.find()
        .then((allDesigns) => {
            res.status(200).json({ designs: allDesigns })
        })
        .catch((err) => {
            res.status(500).json({ message: 'Something went wrong', error: err })
        });
}

module.exports.findAllByUser = (req, res) => {
    Design.find({$or:[{designer: req.params.id}, {voters: {$elemMatch: req.params.id}}]})
        .then((allDesigns) => {
            res.status(200).json({ designs: allDesigns })
        })
        .catch((err) => {
            res.status(500).json({ message: 'Something went wrong', error: err })
        });

}

module.exports.findOneDesign = (req, res) => {
    Design.findOne({ _id: req.params.id })
        .then(oneDesign => {
            res.status(200).json({ design: oneDesign })
        })
        .catch((err) => {
            res.status(500).json({ message: 'Something went wrong', error: err })


        });}

module.exports.createNewDesign = (req, res) => {
    const result = uploadToCloudinary(req.file);
    req.body.image = result.url;
    Design.create(req.body)
        .then(newlyCreatedDesign => {
            res.status(200).json({ design: newlyCreatedDesign })

        })
    },

module.exports.updateExistingDesign = (req, res) => {
    const result = uploadToCloudinary(req.file);
    req.body.image = result.url;
    Design.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
        )
        .then(updatedDesign => {
            console.log("We made it!!!!")
            res.status(200).json({ user: updatedDesign })
            })
        .catch((err) => {
                res.status(500).json({ message: 'Something went wrong', error: err })
            })
        },

module.exports.deleteAnExistingDesign = (req, res) => {
    Design.deleteOne({ _id: req.params.id })
        .then(result => {
            res.status(200).json({ result: result })
            })
        .catch((err) => {
            res.status(500).json({ message: 'Something went wrong', error: err })
            })
        }
