import * as userService from '../services/user.js'
import mailer from '../services/mail.js'
import { v4 } from 'uuid'

export const getUserBySub = async (req, res) => {
  try {
    const { sub } = req.params

    const data = await userService.getUserBySub(sub)
  
    res.status(200).json({ message: 'user by sub success', data })
  } catch (error) {
    res.status(400).json({ message: 'something went wrong during get user by sub', err: error.message })
  }
}

export const forgotPassRequest = async (req, res) => {
  try {
    const { email } = req.params
    const key = v4()

    const data: any = await userService.forgotPassRequest(email)
    const mail = await mailer.sendForgotPassRequestEmail(email, `${process.env.CLIENT_URL}/forgotpass/${data.user._id}/${key}`)
  
    res.status(200).json({ message: 'forgot pass success', data })
  } catch (error) {
    res.status(400).json({ message: 'something went wrong during forgot pass', err: error.message })
  }
}

export const forgotPass = async (req, res) => {
  try {
    const { id } = req.params
    const { newPass, confirmPass } = req.body

    const data = await userService.forgotPass(id, newPass, confirmPass)
  
    res.status(200).json({ message: 'forgot pass success', data })
  } catch (error) {
    res.status(400).json({ message: 'something went wrong during forgot pass', err: error.message })
  }
}

export const changePass = async (req, res) => {
  try {
    const { oldPass, newPass } = req.body

    const data = await userService.changePass(req.userId, oldPass, newPass)
  
    res.cookie('refreshToken', data.rtoken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
    res.status(200).json({ message: 'change pass success', data })
  } catch (error) {
    res.status(400).json({ message: 'something went wrong during change pass', err: error.message })
  }
}
