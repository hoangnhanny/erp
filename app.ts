import express from "express";
import cors from "cors";
import { json } from "body-parser";
import { setupSwagger } from "./src/config/swagger";
import router from "./src/routes";
import { authMiddleware } from "./src/middleware/auth.middleware";
import { responseHandler } from "./src/middleware/response.middleware";

const app = express();

app.use(cors());
app.use(json());

app.use("/api-docs", (req, res, next) => next());

app.use(authMiddleware as any);
app.use(responseHandler);
app.use(router);

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

setupSwagger(app);

export default app;
