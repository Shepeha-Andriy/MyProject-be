import express from 'express'
const router = express.Router()

import { signup, signin, googleAuth } from '../controllers/auth.js'

router.post('/signup', signup)
router.post('/signin', signin)
router.post('/google', googleAuth)

export default router
