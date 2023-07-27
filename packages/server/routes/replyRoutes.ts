import { Router } from "express";

import { createReply, editReply, deleteReply } from "../controllers/replyController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router.post("/create_reply", authMiddleware, createReply);
router.put("/edit_reply/:id", authMiddleware, editReply);
router.delete("/delete_reply/:id", authMiddleware, deleteReply);

export default router;
