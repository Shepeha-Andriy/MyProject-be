import * as goodService from '../services/good.js'

export const getAll = async (req, res) => {
  try {
    const data = await goodService.getAll(req.query)
    
    res.status(200).json({ message: 'all goods success', data })
  } catch (error) {
    res.status(400).json({ message: 'something went wrong during get all goods', err: error.message })
  }
}

export const getCartGoods = async (req, res) => {
  try {
    const data = await goodService.getCartGoods(req.query)
    
    res.status(200).json({ message: 'all goods success', data })
  } catch (error) {
    res.status(400).json({ message: 'something went wrong during get all goods', err: error.message })
  }
}

export const addToCart = async (req, res) => {
  try {
    const data = await goodService.addToCart(req.body)
    
    res.status(200).json({ message: 'all goods success', data })
  } catch (error) {
    res.status(400).json({ message: 'something went wrong during get all goods', err: error.message })
  }
}

export const removeFromCart = async (req, res) => {
  try {
    const data = await goodService.removeFromCart(req.body)
    
    res.status(200).json({ message: 'all goods success', data })
  } catch (error) {
    res.status(400).json({ message: 'something went wrong during get all goods', err: error.message })
  }
}

export const increaseCart = async (req, res) => {
  try {
    const data = await goodService.increaseCart(req.body)
    
    res.status(200).json({ message: 'all goods success', data })
  } catch (error) {
    res.status(400).json({ message: 'something went wrong during get all goods', err: error.message })
  }
}

export const decreaseCart = async (req, res) => {
  try {
    const data = await goodService.decreaseCart(req.body)
    
    res.status(200).json({ message: 'all goods success', data })
  } catch (error) {
    res.status(400).json({ message: 'something went wrong during get all goods', err: error.message })
  }
}
