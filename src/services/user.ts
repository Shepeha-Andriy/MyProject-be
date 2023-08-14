import bcrypt from 'bcrypt'
import User from '../models/User.js'
import { generateTokens, saveToken } from './auth.js'

export const getUserBySub = async (sub) => {
  const user = await User.findOne({ googleId: sub })
  
  return { user }
}

export const forgotPassRequest = async (email) => {
  const user = await User.findOne({ email })
  
  if (!user) {
    throw Error('User by with this email not found')
  }

  return user
}

export const forgotPass = async (id, newPass, confirmPass) => {
  const user = await User.findById(id)
  if (!user) {
    throw Error('User for change password not found')
  }

  if (newPass !== confirmPass) {
    throw Error('Password do not match')
  }

  user.password = newPass
  await user.save()

  const { token, rtoken } = generateTokens(user);
  await saveToken(user.id, rtoken);
  
  return { user, token, rtoken }
}

export const changePass = async (id, oldPass, newPass) => {
  const user = await User.findById(id)
  if (!user) {
    throw Error('User for change password not found')
  }

  const passMatch = await bcrypt.compare(oldPass, user.password)
  if (!passMatch) {
    throw new Error('wrong current password');
  }

  user.password = newPass
  await user.save()

  const { token, rtoken } = generateTokens(user);
  await saveToken(user.id, rtoken);

  return { user, token, rtoken }
}
