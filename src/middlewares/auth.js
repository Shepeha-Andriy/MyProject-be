import jwt from 'jsonwebtoken'
import User from '../models/User'

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.Authorization.split(' ')[1]
    const isCustomAuth = token.length < 500
    
    let decodedData

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, process.env.JWT_SECRET)

      req.userId = decodedData?._id
    } else {
      decodedData = jwt.decode(token)
      
      const googleId = decodedData?.sub.toString()
      const user = await User.findOne({ googleId })

      req.userId = user?._id
    }

    next()
  } catch (error) {
    return res.status(400).json({message: 'un authorized', err: error.message})
  }
}
