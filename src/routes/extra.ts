import express from "express";
import rateLimit from "express-rate-limit";
const router = express.Router();

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 хвилина
  max: 10, // Максимальна кількість запитів за 1 хвилину
});

import { downloadPdfOrderInfo, test, schedule } from "../controllers/extra.js";
import { authMiddleware } from "../middlewares/auth.js";

router.get("/download-orderInfo", authMiddleware, downloadPdfOrderInfo);
router.get("/test", test);
router.get("/schedule", schedule);

export default router;
