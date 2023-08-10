import * as goodService from '../services/good.js'

export const getAll = async (req, res) => {
  try {
    const data = await goodService.getAll(req.query)
  
    res.status(200).json({ message: 'all goods success', data })
  } catch (error) {
    res.status(400).json({ message: 'something went wrong during get all goods', err: error.message })
  }
}
