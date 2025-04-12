import { FindOneOptions, Repository } from "typeorm";
import { AppDataSource } from "../../config/data-source";
import SupplierService from "../suppliers/supplier.service";
import UserService from "../user/user.service";
import {
  ApprovalPoRequest,
  CreatePORequest,
  SubmitPoRequest,
} from "./puchaseOrder.dto";
import {
  ApprovalLog,
  Product,
  PurchaseOrder,
  PurchaseOrderItem,
} from "../../entities";
import { NotFoundException } from "../../exception/Exception";

const purchaseOrder: Repository<PurchaseOrder> =
  AppDataSource.getRepository(PurchaseOrder);

const createPO = async (data: CreatePORequest) => {
  const { supplierId, items, userId } = data;

  const existSupplier = await SupplierService.findSupplierById(supplierId);
  if (!existSupplier) {
    throw new NotFoundException("Supplier not found");
  }

  const existingUser = await UserService.getUserById(userId);
  if (!existingUser) {
    throw new NotFoundException("User not found");
  }

  return await AppDataSource.transaction(async (manager) => {
    let totalAmount = 0;
    const poItems: PurchaseOrderItem[] = [];

    for (const item of items) {
      const product = await manager.findOneOrFail(Product, {
        where: { id: item.productId },
      });

      // Tăng pending_stock
      product.pendingStock += item.quantity;

      // Cập nhật giá nếu khác
      if (product.unitPrice !== item.unitPrice) {
        product.unitPrice = item.unitPrice;
      }

      await manager.save(product);

      totalAmount += item.unitPrice * item.quantity;

      const poItem = manager.create(PurchaseOrderItem, {
        product,
        quantity: item.quantity,
        unit_price: item.unitPrice,
      });

      poItems.push(poItem);
    }

    const po = manager.create(PurchaseOrder, {
      supplier: { id: supplierId },
      createdById: userId,
      status: "draft",
      totalAmount: totalAmount,
    });
    return await manager.save(po);
  });
};

const submitPurchaseOrder = async (data: {
  id: string;
  submitById: string;
}) => {
  const po = await purchaseOrder.findOne({
    where: { id: data.id },
    relations: {
      items: true,
      supplier: true,
    },
  } as FindOneOptions<PurchaseOrder>);

  if (po?.createdById !== data.submitById) {
    throw new NotFoundException("Just owner can be submit purchase order");
  }

  if (!po) {
    throw new NotFoundException("Purchase order not found");
  }

  po.status = "pending_review";
  return await purchaseOrder.save(po);
};

const approvePurchaseOrder = async (data: ApprovalPoRequest) => {
  const { id, approverId, comment } = data;
  const po = await purchaseOrder.findOne({
    where: { id: id },
    relations: {
      items: true,
      supplier: true,
    },
  } as FindOneOptions<PurchaseOrder>);
  if (!po) {
    throw new NotFoundException("Purchase order not found");
  }
  if (po.status !== "pending_review") {
    throw new Error("Purchase order is not in pending review status");
  }

  return await AppDataSource.transaction(async (manager) => {
    po.status = "approved";
    await manager.save(po);
    const approvalLog = manager.create(ApprovalLog, {
      approvedById: { id: approverId },
      purchaseOrder: { id: id },
      action: "approved",
      comment: comment ?? null,
    });
    await manager.save(approvalLog);

    const poItems = await manager.find(PurchaseOrderItem, {
      where: { purchaseOrderId: id },
    });

    for (const item of poItems) {
      const product = await manager.findOneOrFail(Product, {
        where: { id: item.productId },
      });
      // product.stock += item.quantity;
      product.pendingStock -= item.quantity;
      await manager.save(product);
    }
  });
};

const getListPurchaseOrder = async (): Promise<PurchaseOrder[]> => {
  const purchaseOrders = await purchaseOrder.find({
    relations: {
      supplier: true,
      createdBy: true,
    },
  });
  return purchaseOrders;
};

const getPurchaseOrderById = async (
  id: string
): Promise<PurchaseOrder | null> => {
  const purchaseOrderData = await purchaseOrder.findOne({
    where: { id: id },
    relations: {
      supplier: true,
      createdBy: true,
    },
  });
  return purchaseOrderData;
};

export const PurchaseOrderService = {
  createPO,
  getListPurchaseOrder,
  submitPurchaseOrder,
  approvePurchaseOrder,
  getPurchaseOrderById,
};
