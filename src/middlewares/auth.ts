import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const isCustomAuth = token.length < 500
    
    let decodedData

    if (token && isCustomAuth) {
      try {
        decodedData = jwt.verify(
          token,
          process.env.JWT_SECRET,
          // (err, decoded) => {
          //   if (err && err instanceof jwt.TokenExpiredError) {
          //     console.log(24523452)
          //     return res
          //       .status(401)
          //       .json({ message: "token has expired", err: err.message });
          //   }
          // }
        );
      } catch (error) {
        return res.status(401).json({message: 'un authorized', err: error.message})
      }
      
      req.userId = decodedData?.id
    } else {
      decodedData = jwt.decode(token)
      
      const googleId = decodedData?.sub.toString()
      const user = await User.findOne({ googleId })
  
      req.userId = user?._id.toString()
      req.user = { ...user, ...decodedData }
    }

    next()
  } catch (error) {
    return res.status(400).json({message: 'un authorized', err: error.message})
  }
}
