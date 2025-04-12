import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Check,
  OneToMany,
} from "typeorm";
import { Supplier } from "./Suppliers";
import { User } from "./User";
import { PurchaseOrderItem } from "./PurchaseOrderItems";

@Entity("purchase_orders")
export class PurchaseOrder {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Supplier, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "supplier_id" })
  supplier!: Supplier;

  @Column({ name: "supplier_id", type: "uuid" })
  supplierId!: string;

  @ManyToOne(() => User, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "created_by" })
  createdBy!: User;

  @Column({ name: "created_by", type: "uuid" })
  createdById!: string;

  @Column({ type: "text" })
  @Check(
    `"status" IN ('draft', 'pending_review', 'approved', 'rejected', 'cancelled')`
  )
  status!: "draft" | "pending_review" | "approved" | "rejected" | "cancelled";

  @Column({
    name: "total_amount",
    type: "numeric",
    precision: 18,
    scale: 2,
    default: 0,
  })
  totalAmount!: number;

  @CreateDateColumn({ type: "timestamp", name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp", name: "updated_at" })
  updatedAt!: Date;

  @OneToMany(() => PurchaseOrderItem, (item) => item.purchaseOrder)
  items!: PurchaseOrderItem[];
}
