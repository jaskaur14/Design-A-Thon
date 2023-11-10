const Designs = require('../model/design.model');
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
let streamifier = require('streamifier');

const uploadToCloudinary = (file) => {
    // return new Promise
        (resolve, reject) => {
        let cld_upload_stream = cloudinary.uploader.upload_stream(
            { folder: "design-a-thon", public_id: file.originalname },
            (error, result) => {
                if (error) reject(error);
                else resolve(result);
            }
        );
        streamifier.createReadStream(file.buffer).pipe(cld_upload_stream);
    };
};

// cloudinary.uploader.destroy

module.exports.findAllDesigns = (req, res) => {
    Designs.find()
        .then((allDesigns) => {
            res.status(200).json({ designs: allDesigns })
        })
        .catch((err) => {
            res.status(500).json({ message: 'Something went wrong', error: err })
        });
}

module.exports.findOneDesign = (req, res) => {
    Designs.findOne({ _id: req.params.id })
        .then(oneDesign => {
            res.status(200).json({ design: oneDesign })
        })
        .catch((err) => {
            res.status(500).json({ message: 'Something went wrong', error: err })
        });}

module.exports.createNewDesign = (req, res) => {
    const result = uploadToCloudinary(req.file);
    req.body.image = result.url;
    Designs.create(req.body)
        .then(newlyCreatedDesign => {
            res.status(200).json({ design: newlyCreatedDesign })
        })
        .catch((err) => {
            res.status(500).json({ message: 'Something went wrong', error: err })
        });}

module.exports.updateExistingDesign = (req, res) => {
    const result = uploadToCloudinary(req.file);
    req.body.image = result.url;
    Designs.findOneAndUpdate(
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
        });}

module.exports.deleteAnExistingDesign = (req, res) => {
    Designs.deleteOne({ _id: req.params.id })
        .then(result => {
            res.status(200).json({ result: result })
        })
        .catch((err) => {
            res.status(500).json({ message: 'Something went wrong', error: err })
        });}
