import Good from '../models/Good.js'
import User from '../models/User.js'
import sortGoods from '../utils/sortGoods.js'

export const getAll = async (params) => {
  let goods;
  const page = Number(params.page) || 1
  const sortParams = sortGoods(params.sort)
  const totalLength = await Good.countDocuments({})
  let length = await Good.countDocuments({})
  let pages = 1
  
  if (params.type && params.page && params.perpage) {
    const startIndex = (page - 1) * params.perpage
    length = await Good.countDocuments({ type: params.type })
    goods = await Good.find({ type: params.type }).collation({ locale: 'en', caseLevel: false }).sort(sortParams).limit(params.perpage).skip(startIndex)
    pages = Math.ceil(length / params.perpage)
  } else if (params.type) {
    length = await Good.countDocuments({ type: params.type })
    goods = await Good.find({ type: params.type }).collation({ locale: 'en', caseLevel: false }).sort(sortParams)
  } else {
    goods = await Good.find().collation({ locale: 'en', caseLevel: false }).sort(sortParams)
  }

  return { totalLength, page, pages, length, goods }
}

export const getCartGoods = async (params) => {
  const user = await User.findById(params.userId);
  const cartItems = user.cart;

  const page = Number(params.page) || 1
  const startIndex = (page - 1) * 8

  const goods = await Good.find({ _id: { $in: Object.keys(cartItems).slice(2) } }).limit(8).skip(startIndex)

  return { amount: user.cart.amount, cost: user.cart.cost, goods }
}

export const addToCart = async ({ userId, productId, price }) => {

}

export const removeFromCart = async ({ userId, productId, price }) => {

}

export const increaseCart = async ({ userId, productId, price }) => {

}

export const decreaseCart = async ({ userId, productId, price }) => {

}
