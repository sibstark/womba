import { Router } from "express";

import { createReaction, deleteReaction, getReactions } from "../controllers/reactionController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router.post("/", authMiddleware, createReaction);
router.get("/", authMiddleware, getReactions);
router.delete("/:id", authMiddleware, deleteReaction);

export default router;
