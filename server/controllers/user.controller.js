const User = require('../models/user.model')
// const Design = require('../models/design.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET_KEY

module.exports = {
    registerUser: async (req, res) => {
        try {
            const usernameCheck = await User.findOne({username: req.body.username})
            const emailCheck = await User.findOne({email: req.body.email})
            if (usernameCheck) {
                res.status(400).json({errors:{username:{message:'This username is already in use. Please select a different username.'}}})
            } else if (emailCheck) { 
                res.status(400).json({errors:{email:{message:'This email has already been registered.'}}})
            } else {
                const newUser = await User.create(req.body)
                const userToken = jwt.sign({_id: newUser._id}, SECRET, {expiresIn:'2h'})
                res.status(201).cookie('userToken', userToken, {httpOnly: true, maxAge: 2*60*60*1000}).json({_id: newUser._id, username: newUser.username, email: newUser.email})
            }
        }
        catch(err) {
            console.log(err)
            res.status(500).json(err)
        }
    }, 

    loginUser: async(req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email })
                .populate({
                    path:"submissions", 
                    populate:{path:"challenge", select:'-submissions'}
                })
                .populate({
                    path:'votedDesigns', 
                    populate:{path:"challenge"}
                })
            if(user) {
                const correctPassword = await bcrypt.compare(req.body.password, user.password)
                if (correctPassword) {
                    const userToken = jwt.sign({_id: user._id}, SECRET, {expiresIn:'2h'})
                    res.status(201).cookie('userToken', userToken, {httpOnly: true, maxAge: 2*60*60*1000}).json({_id: user._id, username: user.username, email: user.email, submissions:user.submissions, votedDesigns:user.votedDesigns})
                } else {
                    res.status(401).json({message:'Invalid email/password'})
                }
            } else {
                res.status(401).json({message:'Invalid email/password'})
            }
        }
        catch(err) { 
            res.status(500).json(err)
        }
    }, 
    
    logoutUser: (req, res) => {
        res.clearCookie('userToken')
        res.status(200).json({message:'Logged out successfully'})
    },

    updateUser: async(req, res) => {
        await User.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true, runValidators: true }
        )
            .populate({
                path:"submissions", 
                populate:{path:"challenge"}
            })
            .populate({
                path:'votedDesigns', 
                populate:{path:"challenge"}
            })
            .then(updatedUser => {
                res.status(200).json({_id: updatedUser._id, username: updatedUser.username, email: updatedUser.email, aboutMe: updatedUser.aboutMe})
            })
            .catch((err) => {
                res.status(400).json(err)
            })
    }, 

    getOneUser: async (req, res) => {
        const user = await User.findOne({ _id: req.params.id })
            .populate({
                path:"submissions", 
                populate:{path:"challenge"}
            })
            .populate({
                path:'votedDesigns', 
                populate:{path:"challenge"}
            })
            .then(oneUser => { res.status(200).json({user: oneUser}) })
            .catch((err) => { res.status(400).json(err) })
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

module.exports.deleteUser = (req, res) => {
    User.deleteOne({ _id: req.params.id })
        .then(result => {
            res.json({ result: result })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });}
