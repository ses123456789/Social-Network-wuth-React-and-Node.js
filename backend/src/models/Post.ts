import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";


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




export default Post;
