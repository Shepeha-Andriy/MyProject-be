import { I18n } from 'i18n'
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const i18next = new I18n({
  locales: ['en', 'ua'],
  directory: path.join(__dirname, 'translation'),
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
