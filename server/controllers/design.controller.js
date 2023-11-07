const Designs = require('../models/design.model');

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
    Designs.create(req.body)
        .then(newlyCreatedDesign => {
            res.status(200).json({ design: newlyCreatedDesign })
        })
        .catch((err) => {
            res.status(500).json({ message: 'Something went wrong', error: err })
        });}

module.exports.updateExistingDesign = (req, res) => {
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
