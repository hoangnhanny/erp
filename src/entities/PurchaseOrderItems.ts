import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { PurchaseOrder } from './PuchaseOrders';
import { Product } from './Product';


@Entity('purchase_order_items')
export class PurchaseOrderItem {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'uuid' })
    purchase_order_id!: string;

    @ManyToOne(() => PurchaseOrder, (po) => po.id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'purchase_order_id' })
    purchaseOrder!: PurchaseOrder;

    @Column({ type: 'uuid' })
    product_id!: string;

    @ManyToOne(() => Product, (product) => product.id)
    @JoinColumn({ name: 'product_id' })
    product!: Product;

    @Column({ type: 'integer' })
    quantity!: number;

    @Column({ type: 'numeric', precision: 12, scale: 2 })
    unit_price!: number;
}
