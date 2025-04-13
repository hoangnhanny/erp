import { FindOneOptions, Repository } from "typeorm";
import { AppDataSource } from "../../config/data-source";
import SupplierService from "../suppliers/supplier.service";
import UserService from "../user/user.service";
import {
  ApprovalPoDto,
  ApprovalPoRequest,
  CreatePODto,
} from "./purchaseOrder.dto";
import {
  ApprovalLog,
  Product,
  PurchaseOrder,
  PurchaseOrderItem,
} from "../../entities";
import { NotFoundException } from "../../exception/Exception";
import AuditLogService from "../audit-logs/auditLogs.service";

const purchaseOrder: Repository<PurchaseOrder> =
  AppDataSource.getRepository(PurchaseOrder);

const createPO = async (data: CreatePODto) => {
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
    const po = manager.create(PurchaseOrder, {
      supplier: { id: supplierId },
      createdById: userId,
      status: "draft",
      totalAmount: totalAmount,
    });

    await manager.save(po);

    for (const item of items) {
      const product = await manager.findOneOrFail(Product, {
        where: { id: item.productId },
      });

      totalAmount += item.unitPrice * item.quantity;

      const poItem = manager.create(PurchaseOrderItem, {
        product,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        purchaseOrderId: po.id,
      });

      manager.save(poItem);
      poItems.push(poItem);
    }

    po.totalAmount = totalAmount;
    await manager.save(po);

    // Audit log
    const auditLogData = {
      action: "create",
      entityType: "PurchaseOrder",
      entityId: userId,
      userId: userId,
      changes: po,
    };
    await AuditLogService.createAudit(auditLogData);
    return po;
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

  return await AppDataSource.transaction(async (manager) => {
    po.status = "pending_review";
    await manager.save(po);
    // Audit log
    const auditLogData = {
      action: "submit",
      entityType: "PurchaseOrder",
      entityId: po.id,
      userId: data.submitById,
      changes: po,
    };
    await AuditLogService.createAudit(auditLogData);
  });
};

const approvePurchaseOrder = async (data: ApprovalPoDto) => {
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

    // Audit log
    const auditLogData = {
      action: "approve",
      entityType: "PurchaseOrder",
      entityId: po.id,
      userId: approverId,
      changes: po,
    };
    await AuditLogService.createAudit(auditLogData);

    // Create approval log
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
