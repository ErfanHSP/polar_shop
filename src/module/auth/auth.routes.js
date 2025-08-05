const express = require("express")
const router = express.Router()
const controller = require("./auth.controller")
const bodyValidator = require("./../../middlewares/bodyValidator")
const {registerValidator, loginValidator} = require("./auth.validator")
const {auth} = require("./../../middlewares/auth")

router.post("/sign-up", bodyValidator(registerValidator), controller.signup)
router.post("/sign-in", bodyValidator(loginValidator), controller.login)
router.delete("/sign-out", auth, controller.logout)

module.exports = router