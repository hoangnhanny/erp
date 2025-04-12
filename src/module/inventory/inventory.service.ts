import { AppDataSource } from "../../config/data-source";
import { InventoryTransaction, Product, PurchaseOrder } from "../../entities";
import {
  BadRequestException,
  NotFoundException,
} from "../../exception/Exception";
import { ReceivedPurchaseOrderRequest, StockType } from "./inventory.dto";

const receivedPurchaseOrder = async (data: ReceivedPurchaseOrderRequest) => {
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

      product.stock += quantity;
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

      console.log(
        `[Thông báo] Đã nhận ${quantity} sản phẩm "${product.name}" từ PO ${po.id}`
      );
    }
  });
};

const InventoryService = {
  receivedPurchaseOrder,
};

export default InventoryService;
