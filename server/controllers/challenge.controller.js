const Challenge = require('../models/challenge.model')
const jwt = require('jsonwebtoken')

module.exports.createNewChallenge = (req,res) => {
    Challenge.create(req.body)
        .then(newlyCreatedChallenge => {
            res.status(200).json({ challenge: newlyCreatedChallenge })
        })
        .catch((err) => {
            res.status(400).json(err)
        })
}

module.exports.getAllChallenges = (req, res) => {
    Challenge.find()
        .then((allChallenges) => {
            res.status(200).json({ challenges: allChallenges })
        })
        .catch((err) => {
            res.status(400).json(err)
        })
}

module.exports.getOneChallenge = (req, res) => {
    Challenge.findOne({ _id: req.params.id })
        .then(oneSingleChallenge => {
            res.status(200).json({ challenge: oneSingleChallenge })
        })
        .catch((err) => {
            res.status(400).json(err)
        })
}

module.exports.updateChallenge = (req, res) => {
    Challenge.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
    )
        .then(updatedChallenge => {
            res.status(200).json({ challenge: updatedChallenge })
        })
        .catch((err) => {
            res.status(400).json(err)
        });}

module.exports.deleteChallenge = (req, res) => {
    Challenge.deleteOne({ _id: req.params.id })
        .then(result => {
            res.status(200).json({ result: result })
        })
        .catch((err) => {
            res.status(400).json(err)
        });}
