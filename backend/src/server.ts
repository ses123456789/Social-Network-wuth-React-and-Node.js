import express from "express";
import cors from "cors";
import sequelize from "./config/database";
import authRoutes from "./routes/auth.routes";
import postRoutes from "./routes/post.routes";
import "./models"
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/posts", postRoutes);
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("PostgreSQL connected");
    await sequelize.sync();
console.log("Models synchronized");

    app.listen(3000, "0.0.0.0", () => {
      console.log("Backend running on port 3000");
    });
  } catch (error) {
    console.error("DB connection error:", error);
  }
};

startServer();
