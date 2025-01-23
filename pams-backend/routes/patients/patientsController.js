var express = require('express');
var router = express.Router();
const cors = require('cors');
const userAccount = require('../../models/userAccountModel');
const verify = require('../../models/verifyModel');
const employee = require('../../models/employeesModel');
const counter = require('../../models/counterModel');
const patient = require('../../models/patientModel');
const bodyParser = require('body-parser');
// const nodemailer = require('nodemailer');
const randomToken = require('random-token')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const Sib = require('sib-api-v3-sdk');
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json());
require('dotenv').config()
const client = Sib.ApiClient.instance
const apiKey = client.authentications['api-key']
apiKey.apiKey = process.env.API_KEY


/***SIGNUP NEW PATIENT************************* */
/********************************************** */

router.post('/signup', async (req, res) => {
  /******Create auto increment id */
  const ch = await counter.findOne({ name: "auto" })
  // console.log(ch.id)
  if (ch == undefined) {
    const new1 = new counter({ name: "auto", seq: 1 })
    new1.save();
  } else {
    await counter.updateOne({
      name: "auto",
      $inc: { seq: 1 },
      new: true
    })
  }
  const lastSeq = await counter.findOne({ name: "auto" })
  const autoID = lastSeq.seq;
  const uid = autoID;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const dob = req.body.dob;
  const gender = req.body.gender;
  const address = req.body.address;
  const contactNo = req.body.contactNo;
  const email = req.body.email;
  const password = req.body.password;
  const role = 'patient';
  const status = 'new';
  const caseDescription = req.body.caseDescription;
  const accountStatus = req.body.accountStatus;
  var token = randomToken(8)
  try {
    //all data should exist
    if (!(firstName && lastName && gender && address && contactNo && email && password)) {
      return res.status(400).json({ Message: 'please fill required fields' })
    } else {

      //check if the user is exist
      const check = await patient.findOne({ email: email })
      const checkAcc = await userAccount.findOne({ email: email })
      const checkVerify = await verify.findOne({ email: email })
        .catch((err) => { console.log(err) })
      if (check || checkAcc || checkVerify) {
        return (res.status(400).json({ Message: "email already exist" }))
      } else {

        //encrypt password
        const encryptPass = await bcrypt.hash(password, 10)
        //save data to database
        const newPatient = new patient({ uid: autoID, firstName, lastName, dob, gender, address, contactNo, email, role, status, accountStatus });
        const newVerify = new verify({ uid: autoID, email, token });
        const newAcc = new userAccount({ uid: autoID, email, password: encryptPass, role, accountStatus });
        newPatient.save();
        newVerify.save();
        newAcc.save();
        return res.status(200).json({ Success: true, Message: "check your email to verify" })
      }
    }
  } catch (error) {
    console.log(error)
  }
})

/****************Get list of all patients***** */
/********************************************* */
router.get('/', async (req, res, next) => {
  // console.log(req.checkUser)
  try {
    const p = await patient.find()
    // .then((res1) => res.send(res1))
    return res.status(200).json(p)
  } catch (err) {
    return next(err)
  }
})
/**Find single patient by id */
router.get('/find/:uid', async (req, res) => {
  const Inputuid = req.params.uid;
  if (isNaN(Inputuid) === true) {
    return res.status(400).json({ Message: "Invalid ID. Please enter a number." })  // if uid is not a number
  }
  try {
    const pdata = await patient.findOne({ uid: Inputuid })
      .then((data) => {
        if (data == null) {
          return res.status(404).json({ Message: "No data found by this id" })  // if patient data not found
        }
        else {
          return res.status(200).json(data)
        }
      })
  } catch (err) {
    console.log(err)
  }
})

/************Find patients list grouped by status type *****/
/***********************************************************/
router.get('/find/status/:status', async (req, res) => {
  const status = req.params.status;
  try {
    await patient.find({ status: status })
      .then((data) => {
        res.status(200).json(data)
        // console.log(data)
      })
  } catch (err) {
    console.log(err)
  }
})

/*****************Delete single patient from database******* */
/********************************************************** */
router.post('/del/:uid', async (req, res) => {
  const Inputuid = req.params.uid;
  if (isNaN(Inputuid) === true) {
    return res.status(400).json({ Message: "Invalid ID. Please enter a number." })  // if uid is not a number
  }
  const list = await patient.findOne({ uid: Inputuid })
  if (list) {
    patient.findOneAndDelete(req.params.uid)
      .then(() => res.json({ message: "Patient Removed" }))
  } else {
    res.status(401).json({ Message: "No data found by this id" })
  }
})

/************************Update patient data ******/
/*********************************************** */
router.put(`/update/:uid`, async (req, res) => {
  try {
    const Inputuid = req.params.uid;
    //Check if inpute id is number
    if (isNaN(Inputuid) === true) {
      return res.status(400).json({ Message: "Invalid ID. Please enter a number." })  // if uid is not a number
    }
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const gender = req.body.gender;
    const dob = req.body.dob;
    const address = req.body.address;
    const contactNo = req.body.contactNo;
    const status = req.body.status;
    const findData = await patient.findOne({ uid: Inputuid })
    //Check if data is found
    if (!(findData)) {
      return res.status(400).json({ Message: "No data found by this id" })  // if patient data not found
    } else {
      const id = findData._id;
      await patient.findByIdAndUpdate(id)
        .then(newData => {
          newData.firstName = firstName;
          newData.lastName = lastName;
          newData.gender = gender;
          newData.dob = dob;
          newData.address = address;
          newData.contactNo = contactNo;
          newData.status = status;
          newData.save()
            .then(data => {
              return res.status(200).json({ Message: "Data Updated", data })
            })
        })
    }
  } catch (err) {
    console.log("Err" + err)
  }
})

/*****************Update patient status ******************* */
/********************************************************** */
router.post(`/update/status/:PID`, async (req, res) => {
  const Inputuid = req.params.PID;
  //Check if inpute id is number
  if (isNaN(Inputuid) === true) {
    return res.status(400).json({ Message: "Invalid ID. Please enter a number." })  // if uid is not a number
  }
  const status = req.body.status;
  const findData = await patient.findOne({ uid: Inputuid })
  //Check if data is found
  if (!(findData)) {
    return res.status(400).json({ Message: "No data found by this id" })  // if patient data not found
  }
  const id = findData._id;
  patient.findByIdAndUpdate(id)
    .then(newData => {
      newData.status = status;
      newData.save()
        .then((updated) => res.status(200).json({ Message: "Updated", "Data": updated }))

    })
})

module.exports = router;