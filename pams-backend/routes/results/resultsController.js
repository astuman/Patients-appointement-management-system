const express = require('express')
const router = express.Router()
const jwt = require("jsonwebtoken");
const auth = require('../../middleware/auth')
const counter = require('../../models/counterModel')

const result = require('../../models/resultsModel')
const patient = require('../../models/patientModel')
var moment = require('moment');
const Result = require('../../models/resultsModel');
moment().format();

/*************Get all results ****************** */
/******************************************** */
router.get(`/`, (req, res) => {
    result.find(req.params.uid)
        .then(results => res.status(200).json(results))
})

/******View single patient report filter by id ***************/
/**************************************************** */
router.get(`/viewpatient/:id`, async (req, res) => {
    const id = req.params.id;
    try {
        const pdata = await patient.findOne({ id: id })
            .then((data) => {
                res.status(200).json(data)
            })
    } catch (err) {
        console.log(err)
    }
})

/*******************Find result filter by transactio ID */
/***************************************************** */
router.get('/find/:tid', async (req, res) => {
    const t = req.params.tid;
    const transactionId = req.body.transactionId;
    const tid = parseInt(t)
    try {

        await result.findOne({ transactionId: tid })
            .then((data) => {
                res.status(200).json(data)
            })
    } catch (err) {
        console.log(err)
    }
})

/**find results filter by doctor id ******/
/***************************************** */
router.get('/doctor/:uid', async (req, res) => {
    const uid = req.params.uid;
    try {
        await result.find({ doctorId: uid })
            .then((data) => {
                res.status(200).json(data)
            })
    } catch (err) {
        console.log(err)
    }
})

/****************Find result filter by patient id ***********/
/******************************************************* */
router.get('/patient/:uid', async (req, res) => {
    const uid = req.params.uid;
    try {
        await result.find({ uid: uid })
            .then((data) => {
                res.status(200).json({ "Message": "Data found" })
            })
    } catch (err) {
        console.log(err)
    }
})


//** filter patient's appointement by status and doctor ID ***/
/********************************************************** */

router.get('/appointement/doctor/:uid', async (req, res) => {
    const current = new Date();
    const currentDate = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`;

    const uid = req.params.uid;
    try {
        const d = await result.find({ doctorId: uid, appointementDate: { $gt: new Date(currentDate) }, status: "onAppointement" })
            .then((data) =>
                res.status(200).json({ "Message": "Data found" })
            )
    } catch (err) {
        console.log(err)
    }
})


//********************************Register result***** */
/************************************************** */
router.post('/add', async (req, res) => {
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
    const current = new Date();
    const currentDate = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`;

    const lastSeq = await counter.findOne({ name: "auto" })

    const autoID = lastSeq.seq;
    const id = req.body.id;
    const uid = req.body.uid;
    const transactionId = autoID;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const dob = req.body.dob;
    const gender = req.body.gender
    const address = req.body.address;
    const contactNo = req.body.contactNo;
    const status = req.body.status;
    const doctorId = req.body.doctorId;
    const healthStatus = req.body.healthStatus;
    const caseDescription = req.body.caseDescription
    const checkedDate = req.body.checkedDate
    const appointementDate = req.body.appointementDate;

    const appDate = new Date(appointementDate);
    const cheDate = new Date(checkedDate);
    //save to database

    // appDate ? status = 'onAppointement' : 'accepted';

    const newReport = new result({ uid: id, transactionId, firstName, lastName, dob, gender, address, contactNo, status, doctorId, healthStatus, caseDescription, checkedDate, appointementDate })
    newReport.save()
        .then(repo => res.status(200).json({ "Message": "Successfully added" }))
})

/************************Update patint tresults *******/
/******************************************************** */
router.post(`/update/:transacId`, async (req, res) => {
    const uid = req.params.transacId;
    const status = req.body.status;
    const findData = await appointement.findOne({ uid: uid })
    const id = findData._id;
    result.findByIdAndUpdate(id)
        .then(newData => {
            newData.status = "completed";
            newData.save()
                .then((updated) => res.status(200).json({ Message: "Updated", "Data": updated }))

        })
})


module.exports = router;