const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        minlength: [3, "Username must be at least 3 characters"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
    }, 
    password: {
        type: String, 
        required: [true, "Password is required"], 
        minLength: [8, "Password must be at least 8 characters"]
    }
}, { timestamps: true })

module.exports = mongoose.model('User', UserSchema);
