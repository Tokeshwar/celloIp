const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const patientSchema = new mongoose.Schema({
    doctorId: {
        type: ObjectId,
        ref: 'Doctor'
    },
    patientName: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Age: {
        type: Number,
        required: true
    },
    Gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Patient', patientSchema)