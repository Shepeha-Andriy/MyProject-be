import User from '../models/User.js'

export const getUserBySub = async (sub) => {
  const user = await User.findOne({ googleId: sub })
  
  return { user }
}