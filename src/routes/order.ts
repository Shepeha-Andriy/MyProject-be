import express from "express";
import rateLimit from "express-rate-limit";
const router = express.Router();

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 хвилина
  max: 10, // Максимальна кількість запитів за 1 хвилину
});

import { create, capture, cancel, failed } from "../controllers/order.js";
import { authMiddleware } from "../middlewares/auth.js";

router.post("/create", authMiddleware, create);
router.post("/capture", authMiddleware, capture);
router.post("/failed", authMiddleware, failed);
router.post("/cencel", authMiddleware, cancel);

export default router;
