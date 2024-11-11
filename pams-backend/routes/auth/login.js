var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs')
var cookieParser = require('cookie-parser')
const accountList = require('../users/usersAccount')
const userAccount = require('../../models/userAccountModel');
const jwt = require("jsonwebtoken");



//************LOGIN FOR ANY USER ********************/
router.post('/', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    if (!(email && password)) {
      res.send('Please fill all fields')
    }else{
  //find the user by request
    const checkUser = await userAccount.findOne({ email: email })
      .catch((err) => {
        console.log("Error", err)
      });
      //if email is not exist
    if (!checkUser) {
      return res.send("email not found")
    }else if (checkUser) {
      const checkPass = await bcrypt.compare(password, checkUser.password)
      if(!checkPass){
        return res.send("Password Error")
      }else{
      //generate token
      const accessToken = jwt.sign(
        { token: checkUser.email }, 'shhhhh',
        {
          expiresIn: "1h"
        }
      );
    
      const datas = {
        expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        role:checkUser.role,
        uid:checkUser.uid,
        _id:checkUser._id,
        password:checkUser.password,
        email:checkUser.email,
        status:checkUser.accountStatus,
      };
      res.status(200).cookie("token", datas.role, datas.uid, datas.password, datas.email,accessToken).json({
        role:datas.role,
        uid:datas.uid,
        _id:checkUser._id,
        password:datas.password,
        email:datas.email,
        status:datas.status,
      })
    }
    }else{
      return res.send('Login error')
    }

  }})
  

module.exports = router;