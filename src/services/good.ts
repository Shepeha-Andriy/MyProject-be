import Good from '../models/Good.js'
import User from '../models/User.js'
import Cart from '../models/Cart.js'
import sortGoods from '../utils/sortGoods.js'

export const getAll = async (params) => {
  let goods;
  const page = Number(params.page) || 1
  const sortParams: any = sortGoods(params.sort)
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

// export const getCartGoods = async (params) => {
//   const user = await User.findById(params.userId);
//   const cartItems = user.cart;
  
//   const page = Number(params.page) || 1
//   const startIndex = (page - 1) * 8
//   const pages = Math.ceil(await Good.countDocuments({ _id: { $in: Object.keys(cartItems).slice(2) } }) / 8)

//   const goods = await Good.find({ _id: { $in: Object.keys(cartItems).slice(2) } }).skip(startIndex)
  
//   return { page, pages, length: goods.length, goods: goods.slice(0, 8) }
// }

// export const addToCart = async ({ userId, productId, price }) => {
//   const user = await User.findById(userId);
//   const userCart = user.cart;

//   if(user.cart[productId]){
//     userCart[productId] += 1;
//   } else {
//     userCart[productId] = 1;
//   }
//   userCart.amount += 1;
//   userCart.cost = Number(userCart.cost) + Number(price);

//   user.cart = userCart;
//   user.markModified('cart');
//   await user.save();

//   return { user, amount: userCart.amount, cost: userCart.cost }
// }

// export const removeFromCart = async ({ userId, productId, price }) => {
//   const user = await User.findById(userId);
//   const userCart = user.cart;

//   userCart.amount -= userCart[productId];
//   userCart.cost -= Number(userCart[productId]) * Number(price);
//   delete userCart[productId];
  
//   user.cart = userCart;
//   user.markModified('cart');
//   await user.save();

//   return { user, amount: userCart.amount, cost: userCart.cost }
// }

// export const increaseCart = async ({ userId, productId, price }) => {
//   const user = await User.findById(userId);
//   const userCart = user.cart;

//   userCart.amount += 1;
//   userCart.cost += Number(price);
//   userCart[productId] += 1;

//   user.cart = userCart;
//   user.markModified('cart');
//   await user.save();

//   return { user, amount: userCart.amount, cost: userCart.cost }
// }

// export const decreaseCart = async ({ userId, productId, price }) => {
//   const user = await User.findById(userId);
//   const userCart = user.cart;
  
//   userCart.amount -= 1;
//   userCart.cost -= Number(price);
//   userCart[productId] -= 1;
  
//   user.cart = userCart;
//   user.markModified('cart');
//   await user.save();

//   return { user, amount: userCart.amount, cost: userCart.cost }
// }
