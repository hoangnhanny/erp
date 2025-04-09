import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Product } from './Product';
import { PurchaseOrder } from './PuchaseOrders';
import { User } from './User';


@Entity('inventory_transactions')
export class InventoryTransaction {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'uuid' })
    product_id!: string;

    @ManyToOne(() => Product, { nullable: false })
    @JoinColumn({ name: 'product_id' })
    product!: Product;

    @Column({
        type: 'text',
        enum: ['stock_in', 'stock_out'],
    })
    type!: 'stock_in' | 'stock_out';

    @Column({ type: 'integer' })
    quantity!: number;

    @Column({ type: 'uuid', nullable: true })
    related_po_id!: string | null;

    @ManyToOne(() => PurchaseOrder, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'related_po_id' })
    relatedPurchaseOrder!: PurchaseOrder | null;

    @Column({ type: 'uuid' })
    performed_by!: string;

    @ManyToOne(() => User, { nullable: false })
    @JoinColumn({ name: 'performed_by' })
    performedBy!: User;

    @Column({ type: 'text', nullable: true })
    note!: string | null;

    @CreateDateColumn({ name: 'created_at' })
    created_at!: Date;
}
