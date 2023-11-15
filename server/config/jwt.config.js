const jwt = require("jsonwebtoken")
const secret = process.env.SECRET_KEY
// const secret = process.env.api_secret

module.exports.secret = secret

module.exports.authenticate = (req, res, next) => {
    jwt.verify(req.cookies.userToken, secret, (err, payload) => {
        if (err) { 
            console.log(err)
            res.status(401).json({verified: false})
        } else {
            next()
        }
    })
}