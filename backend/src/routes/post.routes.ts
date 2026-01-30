import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware";
import {
  createPost,
  getAllPosts,
  getMyPosts,
  toggleLike
} from "../controller/post.controller";

const router = Router();

// Crear post
router.post("/", authMiddleware, createPost);

// Todos los posts
router.get("/", authMiddleware, getAllPosts);

// Posts del usuario logeado
router.get("/me", authMiddleware, getMyPosts);

// Likes
router.post("/:id/like", authMiddleware, toggleLike);

export default router;
