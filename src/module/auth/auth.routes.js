const express = require("express")
const router = express.Router()
const controller = require("./auth.controller")
const bodyValidator = require("./../../middlewares/bodyValidator")
const {registerValidator} = require("./auth.validator")

router.post("/sign-up", bodyValidator(registerValidator), controller.signup)

module.exports = router