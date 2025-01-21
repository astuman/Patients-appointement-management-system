var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs')
const account = require('../../models/userAccountModel')

router.post('/', async (req, res) => {
    const uid = req.body.uid;
    const email = req.body.email;
    const password = req.body.password;
    const u = parseInt(uid)
    // console.log(password)
    if (!(password || email || uid)) {
        return res.status(400).json({ Messaege: "missing input fields" })
    } else {
        const check = await account.findOne({ uid: u})
            .catch((error) => { console.log(error) }
            )
        const encryptPass = await bcrypt.hash(password, 10)
        if (!(check)) {
            return res.status(403).json({ Message: "user not found" })
        } else {
            const foundUi = check.uid;
            const foundId = check._id;
            const foundEmail = check.email;
            if (foundUi != uid) {
                return res.status(400).json({ Message: "verification error" })
            } else
                if (foundEmail !== email) {
                    return res.status(400).json({ Message: "email does not exist" })
                } else {
                    await account.findByIdAndUpdate(foundId)
                        .then((newData => {
                            newData.password = encryptPass;
                            newData.save()
                            return res.status(200).json({ Message: "successfully changed" })
                        }))
                }
        }
    }
})
module.exports = router;
