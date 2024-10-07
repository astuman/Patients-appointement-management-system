const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userAccountSchema = new Schema({
    uid:{
        type:Number
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String
    },
    token:{
        type:String
    },
    accountStatus:{
        type:String
    }
},{
    timestamps:true
});

const Accounts = mongoose.model("Accounts", userAccountSchema);
module.exports = Accounts;
