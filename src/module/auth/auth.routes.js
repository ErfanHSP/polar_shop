const express = require("express")
const router = express.Router()
const controller = require("./auth.controller")
const bodyValidator = require("./../../middlewares/bodyValidator")
const {registerValidator, loginValidator} = require("./auth.validator")

router.post("/sign-up", bodyValidator(registerValidator), controller.signup)
router.post("/sign-in", bodyValidator(loginValidator), controller.login)

module.exports = router