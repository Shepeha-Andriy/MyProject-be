import express from "express";
import mongoose, { ConnectOptions } from "mongoose";
import mongoSanitize from "express-mongo-sanitize";
import cors from "cors";
import donent from "dotenv";
import helmet from "helmet";
import http from 'http'
import path from "path";
import cookieParser from 'cookie-parser'

import { i18next, langMiddleware } from "./utils/i18next.js";
import authRoutes from "./routes/auth.js";
import goodRoutes from "./routes/good.js";
import cartRoutes from "./routes/cart.js";
import orderRoutes from "./routes/order.js";
import userRoutes from "./routes/user.js";
import notificationRoutes from "./routes/notification.js";
import extraRoures from './routes/extra.js'
import { scheduleJobs } from "./utils/schedule/schedule.js";
import { pathToSrc } from "./utils/Constants.js";
import Io from './services/io.js'

//Settings
const app = express();
donent.config();
app.set("views", path.join(pathToSrc, "utils", "schedule"));
app.set("view engine", "ejs");

//Middleware
app.use(cookieParser());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(mongoSanitize())
app.use(i18next.init);
app.use(langMiddleware);
app.use(helmet());
app.use("/api/uploads/img", express.static("uploads/img"));

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/good", goodRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/user", userRoutes);
app.use("/api/notification", notificationRoutes);
app.use('/api/extra', extraRoures)

//Test
// import { buffer, compressAvatar } from "./utils/uploadImg.js";
// import sharp from "sharp";
// app.post(
//   "/test",
//   buffer.array("image", 5),
//   compressAvatar,
//   async (req: any, res) => {
//     const absoluteAvatarsFolderPath = path.resolve("uploads", "img");

//     for (const file of req.files) {
//       await sharp(file.buffer).toFile(
//         path.join(absoluteAvatarsFolderPath, file.originalname)
//       );
//     }

//     res.send({ testTranslation: i18next.__("test") });
//   }
// );

//Start
const start = async () => {
  try {
    mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);

    await scheduleJobs();

    const server = http.createServer(app)
    Io.init(server)

    server.listen(8090, () => {
      console.log("socket work");
    });
    
    app.listen(process.env.PORT, () => {
      console.log(`server started at ${process.env.PORT} port`);
    });
  } catch (error) {
    console.log("start err", error);
  }
};

start();
