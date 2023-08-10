import express from 'express'
import rateLimit  from 'express-rate-limit'
const router = express.Router()

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 хвилина
  max: 10, // Максимальна кількість запитів за 1 хвилину
});

import { getUserBySub } from '../controllers/user.js'
import { authMiddleware } from '../middlewares/auth.js';

router.get('/:sub', authMiddleware, getUserBySub)

export default router