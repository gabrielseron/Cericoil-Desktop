const express = require('express')
const router = express.Router()
const analyzemiddleware = require("./middlewares/analyzeMiddleware")
const authmiddleware = require("./middlewares/authMiddleware")
const controller = require('./controllers/controller')

router.get("/", controller.renderLoginPage)
router.post("/", authmiddleware.login, controller.login)

router.get("/register", controller.renderRegisterPage)
router.post("/register", authmiddleware.register, controller.register)

router.get("/analyze", controller.renderAnalyzePage)
router.post("/analyze", analyzemiddleware.analyze, controller.analyze)

router.get("/changeMail", controller.RenderChangeMailPage)
router.post("/changeMail", authmiddleware.changeMail, controller.changeMail)

router.get("/changePass", controller.RenderChangePassPage)
router.post("/changePass", authmiddleware.changePass, controller.changePass)

router.get("/signout", controller.signout)

module.exports = router