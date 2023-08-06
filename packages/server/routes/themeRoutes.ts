import { Router } from "express";

import { setTheme, getTheme } from "../controllers/themeController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router.get("/", authMiddleware, getTheme);
router.post("/", authMiddleware, setTheme);

export default router;
