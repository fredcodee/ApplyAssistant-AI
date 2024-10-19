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
router.get('/check-resume', authorization, AppController.checkResume)
router.post('/add-job', authorization, AppController.addJob)
router.get('/test-ai', AppController.testAi) 

module.exports= router