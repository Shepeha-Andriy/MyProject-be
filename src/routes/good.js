import express from 'express'
import rateLimit  from 'express-rate-limit'
const router = express.Router()

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 хвилина
  max: 10, // Максимальна кількість запитів за 1 хвилину
});

import { getAll, getCartGoods, addToCart, removeFromCart, increaseCart, decreaseCart } from '../controllers/good.js'

router.get('/all', getAll)
router.get('/cart', getCartGoods)

router.post('/addTocart', addToCart)
router.post('/removeFromCart', removeFromCart)
router.post('/increaseCart', increaseCart)
router.post('/decreaseCart', decreaseCart)

export default router
