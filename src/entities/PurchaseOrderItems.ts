import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { PurchaseOrder } from "./PuchaseOrders";
import { Product } from "./Product";

@Entity("purchase_order_items")
export class PurchaseOrderItem {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "purchase_order_id", type: "uuid" })
  purchaseOrderId!: string;

  @ManyToOne(() => PurchaseOrder, (po) => po.id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "purchase_order_id" })
  purchaseOrder!: PurchaseOrder;

  @Column({ name: "product_id", type: "uuid" })
  productId!: string;

  @ManyToOne(() => Product, (product) => product.id)
  @JoinColumn({ name: "product_id" })
  product!: Product;

  @Column({ type: "integer" })
  quantity!: number;

  @Column({ name: "unit_price", type: "numeric", precision: 12, scale: 2 })
  unitPrice!: number;
}
