import bcrypt from "bcryptjs";
import sequelize from "../config/database";
import User from "../models/User";

const seed = async () => {
  await sequelize.sync({ force: true });

  const users = [
    { username: "alice", password: "123456" },
    { username: "bob", password: "123456" }
  ];

  for (const user of users) {
    const hashed = await bcrypt.hash(user.password, 10);
    await User.create({
      username: user.username,
      password: hashed
    });
  }

  console.log("Seed completed");
  process.exit();
};

seed();
