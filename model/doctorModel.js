const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    doctorName: {
        type: String,
        required: true
    },
    Type: {
        type: String,
        required: true
    },
    Mobile: {
        type: Number,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        requierd: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Doctor', doctorSchema);