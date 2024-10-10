const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const sequencing = require("../config/sequencing");

// const autoIncrement = require('mongoose-sequence')(mongoose);

const employeesModel = new Schema({
    uid: {
        type:Number
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
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
        type: Number,
        required: true

    },
    dob: {
        type: Date,
    },
    departement: {
        type: String,
        required: true
    },
    experienceYear: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
 
    role: {
        type: String,
    },
}, {
    timestamps: true
},
{ _id: false },
);

const Employees = mongoose.model("Employees", employeesModel);
module.exports = Employees;
