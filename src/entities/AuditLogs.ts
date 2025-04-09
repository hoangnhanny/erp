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

  @Column({ type: "uuid" })
  user_id!: string;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: "user_id" })
  user!: User;

  @Column({ type: "text" })
  action!: string;

  @Column({ type: "text" })
  entity_type!: string;

  @Column({ type: "uuid" })
  entity_id!: string;

  @Column({ type: "jsonb" })
  changes!: Record<string, any>;

  @CreateDateColumn({ name: "created_at" })
  created_at!: Date;
}
