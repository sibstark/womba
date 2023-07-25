import { Router } from "express";

import { createReaction, deleteReaction } from "../controllers/reactionController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router.post("/create_reaction", authMiddleware, createReaction);
router.delete("/delete_reaction/:id", authMiddleware, deleteReaction);

export default router;
