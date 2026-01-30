import { Request, Response, RequestHandler } from "express";
import { Sequelize } from "sequelize";
import { Post, User, Like } from "../models";
import { AuthRequest } from "../middleware/auth.middleware";


// Crear post
export const createPost: RequestHandler = async (req, res) => {
  const authReq = req as AuthRequest;

  if (!authReq.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ message: "Message is required" });
  }

  const post = await Post.create({
    message,
    userId: authReq.user.id,
  });

  return res.status(201).json(post);
};

/**
 * Todos los posts
 */
export const getAllPosts: RequestHandler = async (req, res) => {
  const authReq = req as AuthRequest;
  const userId = authReq.user?.id ?? 0;

  const posts = await Post.findAll({
    include: [
      {
        model: User,
        attributes: ["id", "username"],
      },
      {
        model: Like,
        as: "likes",
        attributes: [],
        required: false,
      },
    ],
    attributes: {
      include: [
        [
          Sequelize.fn("COUNT", Sequelize.col("likes.id")),
          "likesCount",
        ],
        [
          Sequelize.literal(
            `SUM(CASE WHEN "likes"."userId" = ${userId} THEN 1 ELSE 0 END) > 0`
          ),
          "likedByMe",
        ],
      ],
    },
    group: ["Post.id", "User.id"],
    order: [["createdAt", "DESC"]],
  });

  res.json(posts);
};




/**
 * Posts del usuario logeado
 */
export const getMyPosts: RequestHandler = async (req, res) => {
  const authReq = req as AuthRequest;

  if (!authReq.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const userId = authReq.user.id;

  const posts = await Post.findAll({
    where: { userId },
    include: [
      {
        model: User,
        attributes: ["id", "username"],
      },
      {
        model: Like,
        as: "likes",
        attributes: [],
        required: false,
      },
    ],
    attributes: {
      include: [
        [
          Sequelize.fn("COUNT", Sequelize.col("likes.id")),
          "likesCount",
        ],
        [
          Sequelize.literal(
            `SUM(CASE WHEN "likes"."userId" = ${userId} THEN 1 ELSE 0 END) > 0`
          ),
          "likedByMe",
        ],
      ],
    },
    group: ["Post.id", "User.id"],
    order: [["createdAt", "DESC"]],
  });

  res.json(posts);
};



//Aceptar o quitar like
export const toggleLike: RequestHandler = async (req, res) => {
  try {
    
    const authReq = req as AuthRequest;

    if (!authReq.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = authReq.user.id;
    const postId = Number(req.params.id);

    if (isNaN(postId)) {
      return res.status(400).json({ message: "Invalid post id" });
    }

    // verificar que el post existe
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // buscar like existente
    const existingLike = await Like.findOne({
      where: { userId, postId },
    });

    if (existingLike) {
      // quitar like
      await existingLike.destroy();
      return res.json({ liked: false });
    }

    // crear like
    await Like.create({ userId, postId });

    return res.json({ liked: true });
  } catch (error) {
    console.error("Toggle like error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
