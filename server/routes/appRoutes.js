import { Router } from 'express';
import authorization from '../middlewares/Auth.js'
import * as AppController from '../controllers/AppController.js'
import upload from '../middlewares/Multer.js'

const router = Router();

router.get("/health", AppController.health)
router.post("/login", AppController.login)
router.post("/register", AppController.register)
router.post("/auth/google", AppController.googleAuth)
router.get("/user",authorization, AppController.userDetails)
router.post('/auth/github', AppController.githubAuth)
router.post('/upload', authorization, upload.single('pdf'), AppController.uploadPdf)



export default router