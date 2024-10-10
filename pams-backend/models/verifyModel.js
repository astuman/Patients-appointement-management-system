const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const verifySchema = new Schema({
    uid:{
        type:Number,
    },
    email:{
        type:String,
        required:true

    },
    token:{
        type:String,
        required:true
    }
}, {
    timestamps:true
})
const verify = mongoose.model('verifies',verifySchema)
module.exports =verify;