import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import zxcvbn from 'zxcvbn'
import User from "../models/User.js"

import { BLOCK_TIME, MAX_LOGIN_ATTEMPT_TO_BLOCK } from '../utils/Constants.js'

//sign up
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

//sign in
export const signin = async ( email, password ) => {
  const user = await User.findOne({ email })
  if (!user) {
    throw new Error('user width given email is not exist')
  }

  if (user.loginAttempt.blockedUntil && user.loginAttempt.blockedUntil > new Date()) {
    throw new Error('Account is blocked');
  }

  const isBlockEnd = new Date((new Date(user.loginAttempt.lastFailedAttempt)).getTime() + BLOCK_TIME);
  if (isBlockEnd < new Date()) {
    user.loginAttempt.failedAttempts = 0;
    user.loginAttempt.blockedUntil = null;
  }
  
  if (user.loginAttempt.blockedUntil && user.loginAttempt.blockedUntil < new Date() && user.loginAttempt.failedAttempts >= MAX_LOGIN_ATTEMPT_TO_BLOCK) {
    user.loginAttempt.failedAttempts = 0;
    user.loginAttempt.blockedUntil = null;
  }

  const passMatch = await bcrypt.compare(password, user.password)
  if (!passMatch) {
    user.loginAttempt.failedAttempts += 1;
    user.loginAttempt.lastFailedAttempt = new Date();

    if (user.loginAttempt.failedAttempts >= MAX_LOGIN_ATTEMPT_TO_BLOCK) {
      user.loginAttempt.blockedUntil = new Date(Date.now() + BLOCK_TIME);
    }

    await user.save();
    throw new Error('Invalid credentials');
  }
  
  const token = jwt.sign(
    { email, id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  )

  return {user, token}
}

// google auth
export const googleAuth = async (username, email, googleId, token) => {
  const isUserExist = await User.findOne({ email })
  if (isUserExist) {
    return {user: isUserExist, token}
  }

  const user = await User.create({ username, email, googleId })
  
  return {user, token}
}

// checks
export const checkPassword = (password, confirmpassword) => {
  if (password.length < 6) {
    throw new Error('password min length is 6')
  }
  
  const pattern = /^(?=.*[A-Z])(?=.*\d).+$/
  if (!pattern.test(password)) {
    throw new Error('password must contain at least one capital letter and one number') 
  }

  const passwordStrength = zxcvbn(password).score;
  if (passwordStrength < 4) {
    throw new Error('password is too weak')
  }

  if (password !== confirmpassword) {
    throw new Error('password should be the same')
  }

  return true
}

export const haveRequiredSignUpValues = (firstName, lastName, email, password, confirmpassword) => {
  if (!firstName) {
    throw new Error('first name is required')
  }

  if (!lastName) {
    throw new Error('last name is required')
  }

  if (!email) {
    throw new Error('email is required')
  }

  if (!password) {
    throw new Error('password is required')
  }

  if (!confirmpassword) {
    throw new Error('confirmpassword is required')
  }

  return true
}

export const haveRequiredSignInValues = ( email, password ) => {
  if (!email) {
    throw new Error('email is required')
  }

  if (!password) {
    throw new Error('password is required')
  }

  return true
}

export const haveRequiredGoogleAuthValues = ( username, email, googleId, token ) => {
  if (!username) {
    throw new Error('username is required')
  }

  if (!email) {
    throw new Error('email is required')
  }

  if (!googleId) {
    throw new Error('googleId is required')
  }

  if (!token) {
    throw new Error('token is required')
  }

  if (token.length < 500) {
    throw new Error('token is not valid')
  }

  return true
}
