import { Router } from "express";

import { createComment, editComment, deleteComment } from "../controllers/commentController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router.post("/create_comment", authMiddleware, createComment);
router.put("/edit_comment/:id", authMiddleware, editComment);
router.delete("/delete_comment/:id", authMiddleware, deleteComment);

export default router;
