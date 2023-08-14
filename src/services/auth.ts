import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import zxcvbn from 'zxcvbn'
import User from "../models/User.js"
import Cart from "../models/Cart.js"
import Token from '../models/Token.js'

import { BLOCK_TIME, MAX_LOGIN_ATTEMPT_TO_BLOCK } from '../utils/Constants.js'
import { signInInvalidCredentials } from '../messages/errorMessages.js'

//sign up
export const signup = async (firstname, lastname, email, password) => {
  const isUserExist = await User.findOne({ email })
  if (isUserExist) {
    throw new Error('user width given email is already exist')
  }

  const hashPass = await bcrypt.hash(password, 6)
  const username = `${firstname} ${lastname}`

  const user = await User.create({ username, email, password: hashPass })
  const cart = await Cart.create({ owner: user._id });
  user.cart = cart._id;
  await user.save();

  const { token, rtoken } = generateTokens(user)
  await saveToken(user.id, rtoken)

  return { user, token, rtoken }
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
    throw new Error(signInInvalidCredentials());
  }
  
  const { token, rtoken } = generateTokens(user);
  await saveToken(user.id, rtoken);

  return { user, token, rtoken }
}

//refresh
export const refresh = async (refreshToken) => {
  if (!refreshToken) {
      throw Error('unauthorized')
  }
 
  const userData: any = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

  const tokenFromDb = await Token.findOne({ refreshToken });
  // console.log('tfb',userData, tokenFromDb)
  if (!userData || !tokenFromDb) {
      throw Error("unauthorized");
  }
  
  const user = await User.findById(userData.id);
  const tokens = generateTokens(user);
  await saveToken(user.id, tokens.rtoken);

  return {...tokens, user}
}

//logout
export const logout = async (rtoken) => {};

// google auth
export const googleAuth = async (username, email, googleId, token) => {
  const isUserExist = await User.findOne({ email })
  if (isUserExist) {
    return {user: isUserExist, token}
  }

  const user = await User.create({ username, email, googleId })
  const cart = await Cart.create({ owner: user._id })
  user.cart = cart._id
  await user.save()

  return { user, token }
}

//tokens
export const generateTokens = (user) => {
  const token = jwt.sign(
    { email: user.email, id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "15h" }
  );
  
  const rtoken = jwt.sign(
    { email: user.email, id: user._id, role: user.role },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "30d" }
  );

  return { token, rtoken }
}

export const saveToken = async(userId, refreshToken) => {
  const tokenData = await Token.findOne({ user: userId });
  if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
  }

  const token = await Token.create({ user: userId, refreshToken });
  
  return token;
}

const removeToken = async(refreshToken) => {
  const tokenData = await Token.deleteOne({ refreshToken });
  
  return tokenData;
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
  if (passwordStrength < 3) {
    throw new Error('password is too weak')
  }

  if (password !== confirmpassword) {
    throw new Error('password should be the same')
  }

  return true
}

// export const haveRequiredSignUpValues = (firstname, lastname, email, password, confirmpassword) => {
//   if (!firstname) {
//     throw new Error('first name is required')
//   }

//   if (!lastname) {
//     throw new Error('last name is required')
//   }

//   if (!email) {
//     throw new Error('email is required')
//   }

//   const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+$/
//   if (!emailPattern.test(email)) {
//     throw new Error('invalid email')
//   }

//   if (!password) {
//     throw new Error('password is required')
//   }

//   if (!confirmpassword) {
//     throw new Error('confirmpassword is required')
//   }

//   return true
// }

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

// activate mail
export const activateMail = async ( id ) => {
  const user = await User.findById(id)
  
  if (!user) {
    throw new Error('wrong activation email link')
  }

  user.isActivated = true;
  user.save()

  return true
}
