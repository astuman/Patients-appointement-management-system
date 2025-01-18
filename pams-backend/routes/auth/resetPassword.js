var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs')
const account = require('../../models/userAccountModel')

router.post('/', async (req, res) => {
    const uid = req.body.uid;
    const email = req.body.email;
    const password = req.body.password;
    // console.log(password)
    if (!(password || email || uid)) {
        return res.status(400).json({Messaege:"missing input fields"})
    } else {
        const check = await account.findOne({ email: email })
            .catch((error) => { console.log(error) }
            )
        const encryptPass = await bcrypt.hash(password, 10)
        if (!(check)) {
            return res.status(400).json({Message:"Email not found"})
        } else {
            const foundUi = check.uid;
            const foundId = check._id
            if (foundUi != uid ) {
                return res.status(400).json({Message:"verification error"})
            } else {
                await account.findByIdAndUpdate(foundId)
                    .then((newData => {
                        newData.password = encryptPass;
                        newData.save()
                        return res.status(200).json({Message:"successfully changed"})
                    }))
            }
        }
    }
})
module.exports = router;
