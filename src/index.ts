import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose'
import cors from 'cors'
import donent from 'dotenv'
import helmet from 'helmet'

import { i18next, langMiddleware } from './utils/i18next.js';
import authRoutes from './routes/auth.js';
import goodRoutes from './routes/good.js';
import cartRoutes from './routes/cart.js';
import orderRoutes from './routes/order.js';

const app = express()
donent.config()

//Middleware
app.use(cors())
app.use(express.json())
app.use(i18next.init)
app.use(langMiddleware)
app.use(helmet())
app.use("/api/uploads/img", express.static("uploads/img"));

//Routes
app.use('/api/auth', authRoutes)
app.use('/api/good', goodRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/order', orderRoutes)

//Test
import { buffer, compressAvatar } from './utils/uploadImg.js';
import sharp from "sharp";
import path from 'path';
app.post("/test", buffer.array('image', 5), compressAvatar, async(req: any, res) => {
  const absoluteAvatarsFolderPath = path.resolve("uploads", "img");
  
  for (const file of req.files) {
    console.log(1)
    console.log(file)
    await sharp(file.buffer).toFile(
      path.join(absoluteAvatarsFolderPath, file.originalname)
    );
  }

  res.send({ testTranslation: i18next.__("test") });
});

const start = () => {
  try {
    mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
  
    app.listen(process.env.PORT, () => {
      console.log(`server started at ${process.env.PORT} port`)
    })
  } catch (error) {
    console.log('start err', error)
  }
}

start()
