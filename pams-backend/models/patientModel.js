const mongoose = require('mongoose');

const patientModelSchema = new mongoose.Schema({
    uid: {
        type: Number,
        required: true,
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    dob: {
        type: String
    },
    gender: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    contactNo: {
        type: String,
        required: true
    },
    appointementDate: {
        type: Date
    },
    doctor: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String
    },
    status:{
        type:String
    },
    caseDescription: {
        type: String,
    },
    healthStatus: {
        bloodGroup: {
            type: "string"
        },
        hiv: {
            type: "string",
        },
        other: {
            type: "string"
        }
    },
},
    {
        timestamps: true
    });

const Patients = mongoose.model("Patients", patientModelSchema);

module.exports = Patients;