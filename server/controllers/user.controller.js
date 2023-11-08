const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET_KEY

module.exports = {
    registerUser: async (req, res) => {
        try {
            const usernameCheck = await User.findOne({username: req.body.username})
            const emailCheck = await User.findOne({email: req.body.email})
            if (usernameCheck) {
                res.status(400)
                assert.equal(error.errors['username'].message, 'This username is already in use. Please select a different username.')
                // .json({message: 'This username is already in use. Please select a different username.'})
            } else if (emailCheck) { 
                res.status(400)
                assert.equal(error.errors['email'].message, 'This email has already been registered.')
                // .json({message:'This email has already been registered.'})
            } else {
                const newUser = await User.create(req.body)
                const userToken = jwt.sign({_id: newUser._id, username:newUser.username, email:newUser.email}, SECRET, {expiresIn:'2h'})
                console.log(userToken)
                res.status(201).cookie('userToken', userToken, {httpOnly: true, maxAge: 2*60*60*1000}).json(newUser)
            }
        }
        catch(err) {
            console.log(err)
            res.status(400).json(err)
        }
    }, 

    loginUser: async(req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email })
            if(user) {
                const correctPassword = await bcrypt.compare(req.body.password, user.password)
                if (correctPassword) {
                    const userToken = jwt.sign({_id: user._id, username:user.username, email:user.email}, SECRET, {expiresIn:'2h'})
                    res.status(201).cookie('userToken', userToken, {httpOnly: true, maxAge: 2*60*60*1000}).json(user)
                } else {
                    res.status(400).json({message:'Invalid email/password'})
                }
            } else {
                res.status(400).json({message:'Invalid email/password'})
            }
        }
        catch(err) { 
            res.status(400).json({error: err})
        }
    }, 
    
    logoutUser: (req, res) => {
        res.clearCookie('userToken')
        res.status(200).json({message:'Logged out successfully'})
    }
}

module.exports.getAllUsers = (req, res) => {
    User.find()
        .then((allUsers) => {
            res.json({ users: allUsers })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        })
}

module.exports.getOneUser = (req, res) => {
    User.findOne({ _id: req.params.id })
        .then(oneSingleUser => {
            res.json({ user: oneSingleUser })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        })
}

module.exports.updateUser = (req, res) => {
    User.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
    )
        .then(updatedUser => {
            res.json({ user: updatedUser })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });}

module.exports.deleteUser = (req, res) => {
    User.deleteOne({ _id: req.params.id })
        .then(result => {
            res.json({ result: result })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });}
