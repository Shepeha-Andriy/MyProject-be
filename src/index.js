import express from 'express';
import mongoose from 'mongoose'
import cors from 'cors'
import donent from 'dotenv'

import { i18next, langMiddleware } from './utils/i18next.js';
import authRoutes from './routes/auth.js';

const app = express()
donent.config()

//Middleware
app.use(cors())
app.use(express.json())
app.use(i18next.init)
app.use(langMiddleware)

//Routes
app.get('/test/:len', (req, res) => {
  res.send({ testTranslation: i18next.__('test') })
})
app.use('/api/auth', authRoutes)

const start = () => {
  try {
    mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  
    app.listen(process.env.PORT, () => {
      console.log(`server started at ${process.env.PORT} port`)
    })
  } catch (error) {
    console.log('start err', error)
  }
}

start()
