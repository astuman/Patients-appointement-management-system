var express = require('express');
var router = express.Router();
const jwt = require("jsonwebtoken");
const auth = require('../../middleware/auth')

const employees = require('../../models/employeesModel')

/* GET users listing . */


router.get('/', (req, res, next) => {
  try {
    employees.find()
    .then((emp) => res.status(200).json(emp))
  } catch (err) {
    return next(err)
  }

});

module.exports = router;