import { DataSource } from "typeorm";
import "dotenv/config";

import "reflect-metadata";
import {
  ApprovalLog,
  InventoryTransaction,
  Product,
  PurchaseOrder,
  PurchaseOrderItem,
  Supplier,
  User,
} from "../entities";
import { AuditLog } from "../entities/AuditLogs";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: 5432,
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASS || "postgres",
  database: process.env.DB_NAME || "mydb",
  synchronize: true,
  logging: false,
  entities: [
    User,
    Supplier,
    Product,
    PurchaseOrder,
    PurchaseOrderItem,
    InventoryTransaction,
    ApprovalLog,
    AuditLog,
  ],
  migrations: ["src/migrations/*.ts"],
});
