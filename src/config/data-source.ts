import { DataSource } from "typeorm";
import "dotenv/config";
import { User } from "../entities/User";
import { Supplier } from "../entities/Suppliers";
import { Product } from "../entities/Product";
import { PurchaseOrder } from "../entities/PuchaseOrders";
import { PurchaseOrderItem } from "../entities/PurchaseOrderItems";
import { InventoryTransaction } from "../entities/InventoryTransaction";
import { ApprovalLog } from "../entities/ApprovalLos";
import { AuditLog } from "../entities/AuditLogs";
import 'reflect-metadata';

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: 5432,
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASS || "postgres",
    database: process.env.DB_NAME || "mydb",
    synchronize: false,
    logging: true,
    entities: [User,
        Supplier,
        Product,
        PurchaseOrder,
        PurchaseOrderItem,
        InventoryTransaction,
        ApprovalLog,
        AuditLog
    ],
    migrations: ['src/migrations/*.ts'],
});