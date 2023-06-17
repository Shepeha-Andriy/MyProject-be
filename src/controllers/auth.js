import * as authService from '../services/auth.js'

export const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmpassword } = req.body

    authService.haveRequiredSignUpValues(firstName, lastName, email, password, confirmpassword)
    authService.checkPassword(password, confirmpassword)
    
    const data = await authService.signup(firstName, lastName, email, password)

    res.status(200).json({message: 'sign up success', data})
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
