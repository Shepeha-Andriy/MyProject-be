import * as authService from '../services/auth.js'
import sendActivationEmail from '../services/mail.js'
import { signUpValidation } from '../validation/user.js'

export const signup = async (req, res) => {
  try {
    const { firstname, lastname, email, password, confirmpassword } = req.body

    signUpValidation(req.body)
    // authService.haveRequiredSignUpValues(firstname, lastname, email, password, confirmpassword)
    authService.checkPassword(password, confirmpassword)
    
    const data = await authService.signup(firstname, lastname, email, password)

    // await sendActivationEmail(email, `${process.env.SERVER_URL}/api/auth/activate/${data.user._id}`)

    res.status(201).json({message: 'sign up success', data})
  } catch (error) {
    res.status(400).json({message: 'something went wrong during signup', err: error.message})
  }
}

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body
    
    authService.haveRequiredSignInValues(email, password)
    
    const data = await authService.signin(email, password)

    res.status(200).json({message: 'sign in success', data})
  } catch (error) {
    res.status(400).json({message: 'something went wrong during signin', err: error.message})
  }
}

export const googleAuth = async (req, res) => {
  try {
    const { username, email, googleId, token } = req.body

    authService.haveRequiredGoogleAuthValues(username, email, googleId, token)
    
    const data = await authService.googleAuth(username, email, googleId, token)

    res.status(200).json({message: 'google login success', data})
  } catch (error) {
    res.status(400).json({message: 'something went wrong during google auth', err: error.message})
  }
}

export const activate = async (req, res) => {
  try {
    const { id } = req.params

    authService.activateMail(id)

    return res.redirect(`${process.env.CLIENT_URL}`);
  } catch (error) {
    res.status(400).json({message: 'something went wrong during email activation', err: error.message})
  }
}
