var express = require('express');
var router = express.Router();
const cors = require('cors');
const userAccount = require('../../models/userAccountModel');
const verify = require('../../models/verify');
// const { verify } = require('jsonwebtoken');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const randomToken = require('random-token')
const { check, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");

const Sib = require('sib-api-v3-sdk')
require('dotenv').config()
const client = Sib.ApiClient.instance
const apiKey = client.authentications['api-key']
apiKey.apiKey = process.env.API_KEY


router.post('/', async (req, res) => {

    const email = req.body.email;
    const token = req.body.token;
    const acc = await userAccount.findOne({ email: email });
    const ver = await verify.findOne({ email: email })
    if (acc) {
        newMail = acc.email;
        newMail2 = ver.email;
        insertedToken = token;
        searchedToken = ver.token;
        state = acc.account_status;

        if (insertedToken != searchedToken) {
            res.send("Verification did not match")
        }
        else if (state == "verified") {
            res.send("already verified")
        }
        else {
            var newQuery = { email: email }
            var newValue = { account_status: 'verified' }
            await userAccount.findOneAndUpdate(newQuery, newValue)
                .then(ress => res.status(200).json({ statusUpdated: true }))
        }
    } else {
        res.send({accountExisted:false})
    }

})
module.exports = router;