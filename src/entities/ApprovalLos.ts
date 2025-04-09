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

  @Column({ type: "uuid" })
  purchase_order_id!: string;

  @ManyToOne(() => PurchaseOrder, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "purchase_order_id" })
  purchaseOrder!: PurchaseOrder;

  @Column({ type: "uuid" })
  approved_by!: string;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: "approved_by" })
  approvedBy!: User;

  @Column({
    type: "varchar",
    enum: ["approved", "rejected"],
  })
  action!: "approved" | "rejected";

  @Column({ type: "text", nullable: true })
  comment!: string | null;

  @CreateDateColumn({ name: "created_at" })
  created_at!: Date;
}
