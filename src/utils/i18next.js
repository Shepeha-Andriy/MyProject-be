import { I18n } from 'i18n'

export const i18next = new I18n({
  locales: ['en', 'ua'],
  directory: './src/translation',
  defaultLocale: 'en'
})

export const langMiddleware = (req, res, next) => {
  try {
    const lang = req.headers.lang

    if (!lang) {
      i18next.setLocale('en')
      console.log(2)
      return next()
    }
    
    i18next.setLocale(lang)
    next()
  } catch (error) {
    return res.status(400).json({message: 'something went wrong', err: error.message})
  }
}
