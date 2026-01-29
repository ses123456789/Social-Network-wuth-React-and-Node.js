import { Router } from "express";
import Post from "../models/Post";
import User from "../models/User";
import authMiddleware, {
  AuthRequest
} from "../middleware/auth.middleware";

const router = Router();

//Crear post
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

///Todos los post
router.get("/", authMiddleware, async (_req, res) => {
  const posts = await Post.findAll({
    include: ["User"],
    order: [["createdAt", "DESC"]]
  });

  return res.json(posts);
});

/// Post del usuario logeado
router.get("/me", authMiddleware, async (req: any, res) => {
  const userId = req.user.id;

  const posts = await Post.findAll({
    where: { userId },
    include: [{ model: User, attributes: ["id", "username"] }],
    order: [["createdAt", "DESC"]],
  });

  res.json(posts);
});
export default router;
