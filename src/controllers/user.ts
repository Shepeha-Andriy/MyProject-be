import * as userService from '../services/user.js'

export const getUserBySub = async (req, res) => {
  try {
    const { sub } = req.params

    const data = await userService.getUserBySub(sub)
  
    res.status(200).json({ message: 'user by sub success', data })
  } catch (error) {
    res.status(400).json({ message: 'something went wrong during get user by sub', err: error.message })
  }
}
