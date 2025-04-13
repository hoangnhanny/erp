import { AppDataSource } from "../../config/data-source";
import { InventoryTransaction, Product, PurchaseOrder } from "../../entities";
import {
  BadRequestException,
  NotFoundException,
} from "../../exception/Exception";
import AuditLogService from "../audit-logs/auditLogs.service";
import { ReceivedPurchaseOrderDto, StockType } from "./inventory.dto";

const receivedPurchaseOrder = async (data: ReceivedPurchaseOrderDto) => {
  const type = StockType.IN;
  const { relatedPoId, performedBy, note } = data;

  return await AppDataSource.transaction(async (manager) => {
    const po = await manager.findOne(PurchaseOrder, {
      where: { id: relatedPoId },
      relations: ["items", "items.product"],
    });

    if (!po) {
      throw new NotFoundException("PO not found");
    }

    if (po.status !== "approved") {
      throw new BadRequestException("PO is not approved yet");
    }

    for (const item of po.items) {
      const product = item.product;
      const quantity = item.quantity;

      //Update stock product after received
      product.stock += quantity;

      // Decrease pending stock
      product.pendingStock = Math.max(0, product.pendingStock - quantity);

      await manager.save(Product, product);

      const inventoryData = new InventoryTransaction();
      inventoryData.product = product;
      inventoryData.relatedPoId = relatedPoId;
      inventoryData.quantity = quantity;
      inventoryData.performedById = performedBy;
      inventoryData.type = type;
      inventoryData.note = note ?? null;

      await manager.save(inventoryData);

      // Add audit logs
      const auditLogData: AuditLogsRequest = {
        action: "received",
        entityType: "InventoryTransaction",
        entityId: inventoryData.id,
        userId: performedBy,
        changes: inventoryData,
      };
      await AuditLogService.createAudit(auditLogData);

      console.log(
        `[Notification] received ${quantity} product "${product.name}" from PO ${po.id}`
      );
    }
  });
};

const InventoryService = {
  receivedPurchaseOrder,
};

export default InventoryService;
