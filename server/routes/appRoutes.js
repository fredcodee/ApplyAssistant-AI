const router = require('express').Router()
const authorization = require('../middlewares/Auth')
const appController = require('../controllers/AppController')


router.get("/health", appController.health)
router.post("/login", appController.login)
router.get("/logout",authorization.authorization, appController.logout)
router.post("/register", appController.register)
router.get("/user",authorization.authorization, appController.userDetails)



module.exports = router