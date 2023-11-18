const mongoose = require("mongoose")
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        minlength: [3, "Username must be at least 3 characters"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        }
    }, 
    password: {
        type: String, 
        required: [true, "Password is required"], 
        minLength: [8, "Password must be at least 8 characters"]
    }, 
    aboutMe: { type: String },
    submissions: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Design"
        }
    ], 
    votedDesigns: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Design"
        }
    ]
}, { timestamps: true })

// Validate confirm password 
UserSchema.virtual('cfmPassword')
    .get( () => this._cfmPassword )
    .set( value => this._cfmPassword = value )

UserSchema.pre('validate', function(next) {
    if (this.password !== this.cfmPassword) {
        this.invalidate('cfmPassword', 'Password and re-entered password do not match')
    }
    next()
})

// Hash password 
UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash
            next()
        })
})

// UserSchema.pre('findOneAndUpdate', async function(next) {
//     this.options.runValidators = true
//     const update = this.getUpdate()
//     if (update.password) {
//         const passwordHash = await bcrypt.hash(update.password, 10)
//         this.setUpdate({ $set: {
//             password: passwordHash,
//         }})
//     next()
//     }
// })

module.exports = mongoose.model('User', UserSchema)