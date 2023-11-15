const mongoose = require("mongoose")

const ChallengeSchema = new mongoose.Schema({
    theme: {
        type: String,
        required: [true, "Theme is required"],
        minlength: [3, "Theme must be at least 3 characters"]
    },
    postingDate: {
        type: Date,
        required: [true, "Posting date is required"],
        validate: {
            validator: val => {return(new Date(val) >= new Date())},
            message: "Posting date must be in the future"
        }
    }, 
    status: {
        type: Boolean, 
        default: false
    }, 
    submissions: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Design"
        }
    ],
    user: 
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User"
        }
}, { timestamps: true })

module.exports = mongoose.model('Challenge', ChallengeSchema)