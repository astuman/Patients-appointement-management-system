const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const counterModel = new Schema({
    name: {
        type: String
    },
    seq: {
        type: Number
    }
}, {
    timestamps: true
});
const counter = mongoose.model("counters", counterModel);
module.exports = counter;