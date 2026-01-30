import User from "./User";
import Post from "./Post";
import Like from "./Like";
//Relacion user post
User.hasMany(Post, { foreignKey: "userId", onDelete: "CASCADE" });
Post.belongsTo(User, { foreignKey: "userId" });
// relacion user like
User.hasMany(Like, { foreignKey: "userId", as: "likes" });
Like.belongsTo(User, { foreignKey: "userId", as: "user" });
// relacion post like
Post.hasMany(Like, { foreignKey: "postId", as: "likes" });
Like.belongsTo(Post, { foreignKey: "postId", as: "post" });

export { User, Post, Like };