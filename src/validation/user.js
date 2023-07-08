import Joi from 'joi'

export const signUpValidation = (data) => {

  const schema = Joi.object({
    firstname: Joi.string().alphanum().min(3).max(30).required().messages({
      'string.alphanum': 'firstname користувача може містити лише літери та цифри',
      'string.min': 'firstname користувача повинно містити щонайменше {#limit} символи',
      'string.max': 'firstname користувача не може перевищувати {#limit} символів',
      'any.required': 'firstname користувача є обов\'язковим полем',
    }),
    lastname: Joi.string().alphanum().min(3).max(30).required().messages({
      'string.alphanum': 'lastname користувача може містити лише літери та цифри',
      'string.min': 'lastname користувача повинно містити щонайменше {#limit} символи',
      'string.max': 'lastname користувача не може перевищувати {#limit} символів',
      'any.required': 'lastname користувача є обов\'язковим полем',
    }),
    email: Joi.string().pattern(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+$/).required().messages({
      'string.pattern.base': 'invalid email joi',
      'any.required': 'email є обов\'язковим полем'
    }),
    password: Joi.string().required().messages({
      'any.reguired': 'password is reqiured joi'
    }),
    confirmpassword: Joi.string().required().messages({
      'any.required': 'confirmpassword is reqiured joi'
    }),
  });

  const res = schema.validate(data)
   
  if (res.error) {
    throw new Error(res.error.message)
  }

  return true
}
