import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";

@Entity("audit_logs")
export class AuditLog {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "user_id", type: "uuid" })
  userId!: string;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: "user_id" })
  user!: User;

  @Column({ type: "text" })
  action!: string;

  @Column({ name: "entity_type", type: "text" })
  entityType!: string;

  @Column({ name: "entity_id", type: "uuid" })
  entityId!: string;

  @Column({ type: "jsonb" })
  changes!: Record<string, any>;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;
}
