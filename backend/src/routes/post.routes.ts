import { Router } from "express";
import Post from "../models/Post";
import authMiddleware, {
  AuthRequest
} from "../middleware/auth.middleware";

const router = Router();

/**
 * Crear publicación
 */
router.post("/", authMiddleware, async (req: AuthRequest, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ message: "Message is required" });
  }

  const post = await Post.create({
    message,
    userId: req.user!.id
  });

  return res.status(201).json(post);
});

/**
 * Listar publicaciones
 */
router.get("/", authMiddleware, async (_req, res) => {
  const posts = await Post.findAll({
    include: ["User"],
    order: [["createdAt", "DESC"]]
  });

  return res.json(posts);
});

export default router;
