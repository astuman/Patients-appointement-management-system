var express = require('express');
var router = express.Router();
const cors = require('cors');
const jwt = require("jsonwebtoken");
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const randomToken = require('random-token');
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json());


require('dotenv').config()
const userAccount = require('../../models/userAccountModel');
const verify = require('../../models/verifyModel');
const employee = require('../../models/employeesModel');
const counter = require('../../models/counterModel');
const patient = require('../../models/patientModel');

/**   Fetching employees data********************/
/*********************************************** */
router.get('/', (req, res, next) => {
    try {
      employee.find()
        .then((emp) => res.status(200).json(emp))
    } catch (err) {
      return next(err)
    }
  
  });
  
/******************** Register employee by admin. ************** */
/************************************************************** */

router.post('/register', async (req, res) => {
  /******Create auto increment id */
  const ch = await counter.findOne({ name: "auto" })
  // console.log(ch.id)
  if (ch === null) {
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
  // console.log(autoID)
  
  const uid = autoID;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const gender = req.body.gender;
  const address = req.body.address;
  const contactNo = req.body.contactNo;
  const departement = req.body.departement;
  const dob = req.body.dob;
  const experienceYear = req.body.experienceYear;
  const email = req.body.email;
  const password = req.body.password;
  const role = req.body.role;
  var token = randomToken(8)
  //all inputs should exist
  try {
    if (!(firstName && lastName && gender && address && contactNo && departement && email && password)) {
      return res.status(400).json({ Message: 'please fill required fields' })
    }
    const checkEmp = await employee.findOne({ email: email })
    const checkVerify = await verify.findOne({ email: email })
    const checkAcc = await userAccount.findOne({ email: email })
      .catch((err) => { console.log(err) })
    if (checkEmp || checkVerify || checkAcc) {
      return res.status(400).json({ Message: "email already exist" })
    } else {
      // const encryptPass = await bcrypt.hash(password, parseInt(5, 10));
      const encryptPass = await bcrypt.hash(password, 10)
      //save data to database
      const newEmployee = new employee({ uid, firstName, lastName, gender, address, contactNo, dob, departement, experienceYear, email, role });
      const newVerify = new verify({ uid: autoID, email, token });
      const newAcc = new userAccount({ uid: autoID, email, password: encryptPass, role });
      newEmployee.save();
      newVerify.save();
      newAcc.save();
      return res.status(200).json({ Success: true, Message: "check your email to verify" })
    }
  } catch (err) {
    console.log(err)
  }
}
)

/****  Register Admin for first time only********************/
/********************************************************** */

router.post('/register/admin', async (req, res) => {
  /******Create auto increment id */
  const sourceStaffCode = 'ABC';
  const ch = await counter.findOne({ name: "auto" })
  // console.log(ch)
  if (ch === null) {
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
  // console.log(autoID)

  const uid = autoID;
  const staffCode = req.body.staffCode;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const gender = req.body.gender;
  const address = req.body.address;
  const contactNo = req.body.contactNo;
  const departement = req.body.departement;
  const dob = req.body.dob;
  const experienceYear = req.body.experienceYear;
  const email = req.body.email;
  const password = req.body.password;
  const role = 'admin';
  var token = randomToken(8)
  //all data should exist
  try {
    if (!(staffCode && firstName && lastName && gender && address && contactNo && departement && email && password)) {
      return res.status(400).json({ Message: 'please fill required fields' })
    }
    const check = await employee.findOne({ email: email })
    const checkVerfy = await verify.findOne({ email: email })
    const checkAcc = await userAccount.findOne({ email: email })
      .catch((err) => { console.log(err) })
    if (check || checkVerfy || checkAcc) {
      return res.status(400).json({ Message: "email already exist" })
    } else {
      const encryptPass = await bcrypt.hash(password, 10)
      //save data to database
      if (staffCode === sourceStaffCode) {
        const newEmployee = new employee({ uid, firstName, lastName, gender, address, contactNo, dob, departement, experienceYear, email, role });
        const newVerify = new verify({ uid: autoID, email, token });
        const newAcc = new userAccount({ uid: autoID, email, password: encryptPass, role });

        newEmployee.save();
        newVerify.save();
        newAcc.save();

        return res.status(200).json({ Success: true, Message: "Successfully Registered" })

      } else {
        return res.status(400).send('invalide staff code')
      }
    }
  } catch (err) {
    console.log(err)
  }
}
)
/********************************************** */

/*************  Update Employees by Admin *************************** */
/****************************************************************** */
router.post(`/update/:uid`, async (req, res) => {
  const uid = req.params.uid;
  const address = req.body.address;
  const contactNo = req.body.contactNo;
  const findData = await employee.findOne({ uid: uid })
  const id = findData._id;
  await employee.findByIdAndUpdate(id)
    .then(newData => {
      newData.address = address;
      newData.contactNo = contactNo;
      newData.save()
        .then((updated) => res.status(200).json({ Message: "Updated", "Data": updated }))
        // .catch((err) => res.status(500).send(err))

    })
})

/************* Finde an employee by ID**************** */
/**************************************************** */

router.get('/find/:uid', async (req, res) => {
  const u = req.params.uid;
  const uid = parseInt(u)
  try {
    const empdata = await employee.findOne({ uid: uid })
      .then((data) => {
        res.status(200).json({"Message":"Employees found"})
      })
  } catch (err) {
    console.log(err)
  }
})

  module.exports = router;
