import { Request, Response, RequestHandler } from "express";
import { Sequelize, Op } from "sequelize";
import { Like, Post,User } from "../models";
import { AuthRequest } from "../middleware/auth.middleware";

/**
 * Buscar usuarios por username
 
 */
export const getUsers: RequestHandler = async (req, res) => {
  try {
    const { search } = req.query;

    const where = search
      ? {
          username: {
            [Op.like]: `%${search}%`,
          },
        }
      : undefined;

    const users = await User.findAll({
      where,
      attributes: ["id", "username"],
      order: [["username", "ASC"]],
    });

    res.json(users);
  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({ message: "Error fetching users" });
  }
};

// Get post de un nusuario especifico

export const getAllPosts: RequestHandler = async (req, res) => {
  const authReq = req as AuthRequest;
  const userId = authReq.user?.id ?? 0;

  const { user } = req.query; // 👈 username

  const posts = await Post.findAll({
    where: user
      ? {
          "$User.username$": user, // 👈 filtro por username
        }
      : undefined,

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
