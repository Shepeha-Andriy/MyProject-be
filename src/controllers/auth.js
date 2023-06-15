import * as authService from '../services/auth.js'

export const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body
    
    const response = await authService.signup(firstName, lastName, email, password)

    res.status(200).json({message: 'nice', data: response})
  } catch (error) {
    res.status(400).json({message: 'something went wrong during signup', err: error.message})
  }
}

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body
    
    const response = await authService.signin(email, password)

    res.status(200).json({message: 'nice', data: response})
  } catch (error) {
    res.status(400).json({message: 'something went wrong during signin', err: error.message})
  }
}

export const googleAuth =async (req, res) => {
  try {
    res.status(200).json({message: 'nice'})
  } catch (error) {
    res.status(400).json({message: 'something went wrong during google auth', err: error.message})
  }
}