import Cart from "../models/Cart.js";
import Good from '../models/Good.js'

export const getCartGoods = async (params) => {
  const cart = await Cart.findOne({ owner: params.userId })
  
  const page = Number(params.page) || 1
  const startIndex = (page - 1) * 8
  const pages = Math.ceil(Object.keys(cart.items).length / 8)

  const goods = await Good.find({ _id: { $in: Object.keys(cart.items).slice(1) } }).limit(8).skip(startIndex)
  
  return { page, pages, length: goods?.length, goods: goods, cart }
}

export const getCart = async (userId) => {
  const cart = await Cart.findOne({ owner: userId })

  return { items: cart.items }
}

export const addToCart = async ({ userId, productId, price }) => {
  const cart = await Cart.findOne({ owner: userId })
  
  if (cart.items[productId]) {
    cart.items[productId] += 1;
  } else {
    cart.items[productId] = 1;
  }
  cart.amount += 1;
  cart.cost = Number(cart.cost) + Number(price);
  
  cart.markModified('items');
  await cart.save();

  return { cart }
}

export const removeFromCart = async ({ userId, productId, price }) => {
  const cart = await Cart.findOne({ owner: userId })
  // const userCart = user.cart;

  cart.amount -= cart.items[productId];
  cart.cost -= Number(cart.items[productId]) * Number(price);
  delete cart.items[productId];
  
  cart.markModified('items');
  await cart.save();

  return { cart }
}

export const increaseCart = async ({ userId, productId, price }) => {
  const cart = await Cart.findOne({ owner: userId })

  cart.amount += 1;
  cart.cost += Number(price);
  cart.items[productId] += 1;

  cart.markModified('items');
  await cart.save();

  return { cart }
}

export const decreaseCart = async ({ userId, productId, price }) => {
  const cart = await Cart.findOne({ owner: userId })

  cart.amount -= 1;
  cart.cost -= Number(price);
  cart.items[productId] -= 1;
  
  cart.markModified('items');
  await cart.save();

  return { cart }
}
