const express = require('express')
const router = express.Router()
const jwt = require("jsonwebtoken");
const auth = require('../../middleware/auth')
const counter = require('../../models/counterModel')

const appointement = require('../../models/appointementModel')
const patient = require('../../models/patientModel')
const result = require('../../models/resultsModel')

var moment = require('moment');
moment().format();

/*************Create new appointment ****************** */
/******************************************************* */

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

    const newAppo = new appointement({ uid: id, transactionId, firstName, lastName, dob, gender, address, contactNo, status, doctorId, healthStatus, caseDescription, checkedDate, appointementDate })
    newAppo.save()
        .then(repo => res.status(200).json({ "Message": "Successfully added" }))
})

/*************Get all appointments ****************** */
/**************************************************** */
router.get(`/`, (req, res) => {
    appointement.find(req.params.uid)
        .then(results => res.status(200).json(results))
})
/****************************Get Patient by id */
/******************************************** */
router.get('/patient/:uid', async (req, res) => {
    const uid = req.params.uid;
    try {
        await result.find({ uid: uid })
            .then((data) => {
                res.status(200).json(data)
            })
    } catch (err) {
        console.log(err)
    }
})

/**Get patient filter by assigned doctor id *********/
/************************************************** */
router.get('/doctor/:uid', async (req, res) => {
    const current = new Date();
    const currentDate = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`;

    const uid = req.params.uid;
    // const appointementStatus = "onAppointement";
    try {
        const d = await appointement.find({ doctorId: uid, appointementDate: { $gt: new Date(currentDate) } })
            .then((data) =>
                res.status(200).json(data)
            )
    } catch (err) {
        console.log(err)
    }
})

/**Update status of appointement filter by patient ID */

router.put('/update/status/:PID', async (req, res) => {
    const uid = req.params.PID;
    const st = req.body.status
    const findPatient = await appointement.findOne({ uid: uid })
    const id = findPatient._id
    // const appDate = findPatient.appointementDate
    await appointement.findByIdAndUpdate(id)
        .then(newData => {
            newData.status = st
            newData.save()
                .then((updated) => res.status(200).send("updated"))

        })

})

module.exports = router;