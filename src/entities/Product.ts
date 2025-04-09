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

  @Column({ type: "numeric", precision: 12, scale: 2, nullable: true })
  unit_price!: number | null;

  @Column({ type: "integer", default: 0 })
  stock!: number;

  @Column({ type: "integer", default: 0 })
  pending_stock!: number;

  @CreateDateColumn({ type: "timestamp", name: "created_at" })
  created_at!: Date;
}
