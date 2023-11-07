const mongoose = require('mongoose');

const DesignSchema = new mongoose.Schema({
    
    image: {
        type: Image,
        required: [true, 'image is required']
    },

    commentary: {
        type: String,
        required: [true, "commentary is required"],
        maxLength: [300, "commentary must be under 300 characters"]
    },
    },
{ timestamps: true }
);

const Design = mongoose.model('Design', DesignSchema);

module.exports = Design;
