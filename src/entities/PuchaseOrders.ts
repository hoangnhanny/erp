import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    Check,
} from 'typeorm';
import { Supplier } from './Suppliers';
import { User } from './User';


@Entity('purchase_orders')
export class PurchaseOrder {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @ManyToOne(() => Supplier, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'supplier_id' })
    supplier!: Supplier;

    @Column({ type: 'uuid' })
    supplier_id!: string;

    @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'created_by' })
    createdBy!: User;

    @Column({ type: 'uuid' })
    created_by!: string;

    @Column({ type: 'text' })
    @Check(`"status" IN ('draft', 'pending_review', 'approved', 'rejected', 'cancelled')`)
    status!: 'draft' | 'pending_review' | 'approved' | 'rejected' | 'cancelled';

    @Column({ type: 'numeric', precision: 18, scale: 2, default: 0 })
    total_amount!: number;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    created_at!: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updated_at!: Date;
}
