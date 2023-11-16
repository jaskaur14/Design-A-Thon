const Challenge = require('../models/challenge.model')
const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
// const SECRET = process.env.SECRET_KEY
const SECRET = "password"


module.exports.createNewChallenge = (req,res) => {
    const user = jwt.verify(req.cookies.userToken, SECRET)
    Challenge.create({ ...req.body, user: user })
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
    // const user = jwt.verify(req.cookies.userToken, SECRET)
    Challenge.findOne({ _id: req.params.id })
        .then(oneSingleChallenge => {
            res.status(200).json({ challenge: oneSingleChallenge })
        })
        .catch((err) => {
            res.status(400).json(err)
        })
}

module.exports.updateChallenge = (req, res) => {
    const user = jwt.verify(req.cookies.userToken, SECRET)
    Challenge.findOneAndUpdate(
        { _id: req.params.id, user: user },
        req.body,
        { new: true, runValidators: true }
    )
        .then(updatedChallenge => {
            res.status(200).json({ challenge: updatedChallenge })
        })
        .catch((err) => {
            res.status(400).json(err)
        })
}

module.exports.deleteChallenge = (req, res) => {
    Challenge.deleteOne({ _id: req.params.id })
        .then(result => {
            res.status(200).json({ result: result })
        })
        .catch((err) => {
            res.status(400).json(err)
        })
}
