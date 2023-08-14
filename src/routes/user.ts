import express from 'express'
import rateLimit  from 'express-rate-limit'
const router = express.Router()

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 хвилина
  max: 10, // Максимальна кількість запитів за 1 хвилину
});

import { getUserBySub, forgotPass, changePass } from '../controllers/user.js'
import { authMiddleware } from '../middlewares/auth.js';
import { forgotPassRequest } from '../services/user.js';

router.get('/:sub', authMiddleware, getUserBySub)
router.patch('/forgotpassrequest/:email', forgotPassRequest)
router.patch('/forgotpass/:id', forgotPass)
router.patch('/changepass', authMiddleware, changePass)

export default router