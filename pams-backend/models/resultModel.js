const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ResultSchema = new Schema(
    {
        uid: {
            type: Number,
            required: true
        },
        transactionId:{
            type:Number,
        },
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        dob: {
            type: Date,
        },
        gender: {
            type: String,
        },
        address: {
            type: String,
        },
        contactNo: {
            type: String,
        },
        doctorId: {
            type: Number,
        },        
        status: {
            type: String
        },
        healthStatus: {
            type:String
        },
        caseDescription: {
            type: String,
        },
        checkedDate: {
            type: Date,
        },
        appointementDate: {
            type: Date,
        },
    },
    {
        timestamps: true
    }
)
const Result = mongoose.model('Result', ResultSchema);
module.exports = Result;