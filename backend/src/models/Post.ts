import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import User from "./User";

class Post extends Model {
  public id!: number;
  public message!: string;
  public userId!: number;
}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: "Post",
    tableName: "posts"
  }
);

User.hasMany(Post, { foreignKey: "userId" });
Post.belongsTo(User, { foreignKey: "userId" });

export default Post;
