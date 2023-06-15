import express from 'express';
import mongoose from 'mongoose'
import cors from 'cors'
import donent from 'dotenv'

import authRoutes from './routes/auth.js'

const app = express()
donent.config()

//Middleware
app.use(cors())
app.use(express.json())

//Routes
app.get('/test', (req, res) => { res.send(200) })
app.use('/api/auth', authRoutes)

const start = () => {
  mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  app.listen(process.env.PORT, () => {
    console.log(`server started at ${process.env.PORT} port`)
  })
}

start()
