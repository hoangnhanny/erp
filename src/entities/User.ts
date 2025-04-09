import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Check,
} from "typeorm";

export type UserRole = "procurement" | "manager" | "inventory" | "finance";

@Entity("users")
@Check(`"role" IN ('procurement', 'manager', 'inventory', 'finance')`)
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("text")
  name!: string;

  @Column("text", { unique: true })
  email!: string;

  @Column("text", { name: "password_hash" })
  passwordHash!: string;

  @Column("text")
  role!: UserRole;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt!: Date;
}
