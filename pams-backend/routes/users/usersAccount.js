var express = require('express');
var router = express.Router();
const userAccount = require('../../models/userAccountModel')
// const auth = require('../../middleware/auth')
const bcrypt = require('bcryptjs')

// import { useSignIn } from 'react-auth-kit'

/* GET users listing. */
router.get('/', (req, res) => {
  userAccount.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json(err))
});

router.get('/find/:uid', async (req, res) => {
  const u = req.params.uid;
  const uid = parseInt(u)
  try {
    const accdata = await userAccount.findOne({ uid: uid })
      .then((data) => {
        res.status(200).json(data)
      })
  } catch (err) {
    console.log(err)
  }
})
router.get('/find/status/:status', async (req, res) => {
  const st = req.params.status;
  // const uid = parseInt(u)
  try {
    const accdata = await userAccount.find({ accountStatus: st })
      .then((data) => {
        res.status(200).json(data)
      })
  } catch (err) {
    console.log(err)
  }
  
})

//////////UPDATE////////////////////

router.put(`/blockaccount/:uid`, async (req, res) => {
  const uid = req.params.uid;
  const accountStatus = req.body.accountStatus;
  const foundData = await userAccount.findOne({uid})
  const id = foundData._id;
  userAccount.findByIdAndUpdate(id)
    .then(newData => {
      newData.accountStatus = accountStatus
      newData.save()
        .then((updated) => res.status(200).json({ Success: "Blocked" }))
        .catch((err) => res.status(500).json({ "Error": err })
        )

    })
})
router.put(`/reactiveaccount/:uid`, async (req, res) => {
  const uid = req.params.uid;
  const accountStatus = req.body.accountStatus;
  const foundData = await userAccount.findOne({uid})
  const id = foundData._id;
  userAccount.findByIdAndUpdate(id)
    .then(newData => {
      newData.accountStatus = accountStatus
      newData.save()
        .then((updated) => res.status(200).json({ Success: "Activated" }))
        .catch((err) => res.status(500).json({ "Error": err })
        )

    })
})
router.put(`/update/:uid`, async (req, res) => {
  const uid = req.params.uid;
  const password = req.body.password;
  const encryptPass = await bcrypt.hash(password, 10);
  const foundData = await userAccount.findOne({uid});
  const id = foundData._id;
  userAccount.findByIdAndUpdate(id)
    .then(newData => {
      newData.password = encryptPass
      newData.save()
        .then((updated) => res.status(200).json({ Success: "Updated" }))
        .catch((err) => res.status(500).json({ "Error": err })
        )

    })
})


module.exports = router;
