import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from "../models/User.js"

export const signup = async (firstName, lastName, email, password) => {
  const isUserExist = await User.findOne({ email })
  if (isUserExist) {
    throw new Error('user width given email is already exist')
  }

  const hashPass = await bcrypt.hash(password, 6)
  const username = `${firstName} ${lastName}`

  const user = await User.create({ username, email, password: hashPass })
  
  const token = jwt.sign(
    { email, id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  )

  return {user, token}
}

export const signin = async ( email, password ) => {
  const user = await User.findOne({ email })
  if (!user) {
    throw new Error('user width given email is not exist')
  }

  const passMatch = await bcrypt.compare(password, user.password)
  if (!passMatch) {
    throw new Error('wrong password or email')
  }
  
  const token = jwt.sign(
    { email, id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  )

  return {user, token}
}

export const googleAuth = async (username, email, googleId, token) => {
  const isUserExist = await User.findOne({ email })
  if (isUserExist) {
    return {user: isUserExist, token}
  }

  const user = await User.create({ username, email })
  
  return {user, token}
}