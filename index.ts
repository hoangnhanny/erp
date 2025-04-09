import "reflect-metadata";
import dotenv from "dotenv";
import { AppDataSource } from "./src/config/data-source";
import app from "./app";

dotenv.config();

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log("📦 Connected to PostgreSQL");
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error: any) => {
    console.error("❌ Error connecting to the database:", error);
  });
