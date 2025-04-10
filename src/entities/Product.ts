import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "text" })
  name!: string;

  @Column({ type: "text", unique: true })
  sku!: string;

  @Column({ type: "text", nullable: true })
  category!: string | null;

  @Column({
    name: "unit_price",
    type: "numeric",
    precision: 12,
    scale: 2,
    nullable: true,
  })
  unitPrice!: number | null;

  @Column({ type: "integer", default: 0 })
  stock!: number;

  @Column({ name: "pending_stock", type: "integer", default: 0 })
  pendingStock!: number;

  @CreateDateColumn({
    name: "created_at",
    type: "timestamp",
  })
  createdAt!: Date;
}
