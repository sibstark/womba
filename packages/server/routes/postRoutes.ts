import { Router } from "express";

import { getPosts, getPost, createPost, editPost, deletePost } from "../controllers/postController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router.get("/posts", authMiddleware, getPosts);
router.get("/post/:id", authMiddleware, getPost);
router.post("/create_post", authMiddleware, createPost);
router.put("/edit_post/:id", authMiddleware, editPost);
router.delete("/delete_post/:id", authMiddleware, deletePost);

export default router;
