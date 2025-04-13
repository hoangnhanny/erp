import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";
import { PurchaseOrder } from "./PuchaseOrders";
import { User } from "./User";

@Entity("approval_logs")
export class ApprovalLog {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "purchase_order_id", type: "uuid" })
  purchaseOrderId!: string;

  @ManyToOne(() => PurchaseOrder, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "purchase_order_id" })
  purchaseOrder!: PurchaseOrder;

  @Column({ name: "approved_by", type: "uuid" })
  approvedBy!: string;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: "approved_by" })
  approvedById!: User;

  @Column({
    type: "varchar",
    enum: ["approved", "rejected"],
  })
  action!: "approved" | "rejected";

  @Column({ type: "text", nullable: true })
  comment!: string | null;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;
}
