var express = require('express');
var router = express.Router();
const jwt = require("jsonwebtoken");
var cookieParser = require('cookie-parser')


router.post('/', (req, res) =>{
    res.clearCookie('token')
    console.log("logout")
    res.status(200).send("you have successfully logout")

    
})
module.exports = router;