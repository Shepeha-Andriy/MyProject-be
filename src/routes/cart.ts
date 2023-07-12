import express from 'express'
import rateLimit  from 'express-rate-limit'
const router = express.Router()

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 хвилина
  max: 10, // Максимальна кількість запитів за 1 хвилину
});

import { getCartGoods, getCart, addToCart, removeFromCart, increaseCart, decreaseCart } from '../controllers/cart.js'
import { authMiddleware } from '../middlewares/auth.js';

router.get('/cartGoods', authMiddleware, getCartGoods)
router.get('/:userId', authMiddleware, getCart)

router.post('/addTocart', authMiddleware, addToCart)
router.post('/removeFromCart', authMiddleware, removeFromCart)
router.post('/increaseCart', authMiddleware, increaseCart)
router.post('/decreaseCart', authMiddleware, decreaseCart)

export default router
