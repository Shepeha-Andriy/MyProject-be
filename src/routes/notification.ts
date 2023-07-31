import express from "express";
import rateLimit from "express-rate-limit";
const router = express.Router();

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 хвилина
  max: 10, // Максимальна кількість запитів за 1 хвилину
});

import { create, getMy, deleteOne, deleteAll } from "../controllers/notification.js";
import { authMiddleware } from "../middlewares/auth.js";

router.get("/getMy", authMiddleware, getMy);
router.post("/create", authMiddleware, create);
router.delete("/delete/:id", authMiddleware, deleteOne);
router.delete("/delete", authMiddleware, deleteAll);


export default router;
