const router = require('express').Router()
const authorization = require('../middlewares/Auth')
const AppController = require('../controllers/AppController')
const upload = require('../middlewares/Multer')


router.get("/health", AppController.health)
router.post("/login", AppController.login)
router.post("/register", AppController.register)
router.post("/auth/google", AppController.googleAuth)
router.get("/user",authorization, AppController.userDetails)
router.post('/auth/github', AppController.githubAuth)
router.post('/upload', authorization, upload.single('pdf'), AppController.uploadPdf)


module.exports= router