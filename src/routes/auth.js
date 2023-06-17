import express from 'express'
import rateLimit  from 'express-rate-limit'
const router = express.Router()

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 хвилина
  max: 10, // Максимальна кількість запитів за 1 хвилину
});

import { signup, signin, googleAuth } from '../controllers/auth.js'

router.post('/signup', limiter, signup)
router.post('/signin', limiter, signin)
router.post('/google', limiter, googleAuth)

export default router
