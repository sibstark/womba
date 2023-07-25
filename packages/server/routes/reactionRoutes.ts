import { Router } from "express";

import { createReaction, deleteReaction, getReactions } from "../controllers/reactionController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router.post("/", authMiddleware, createReaction);
router.delete("/:id", authMiddleware, deleteReaction);
router.get("/", authMiddleware, getReactions);

export default router;
