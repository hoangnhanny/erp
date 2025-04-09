import express from "express";
import cors from "cors";
import { json } from "body-parser";
import { setupSwagger } from "./src/config/swagger";
import router from "./src/routes";
import { authMiddleware } from "./src/middleware/auth.middleware";

const app = express();

app.use(cors());
app.use(json());

app.use("/api-docs", (req, res, next) => next());

app.use(authMiddleware); // Apply auth middleware to all routes

app.use(router);
// app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

setupSwagger(app);

export default app;
