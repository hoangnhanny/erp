import { Repository } from "typeorm";
import { AppDataSource } from "./../../config/data-source";
import { Supplier } from "../../entities/Suppliers";
import { CreateSupplierDto, CreateSupplierResponse } from "./supplier.dto";
import { AuditLog } from "../../entities/AuditLogs";

const supplierRepository: Repository<Supplier> =
  AppDataSource.getRepository(Supplier);

export const createSupplier = async (
  data: CreateSupplierDto
): Promise<CreateSupplierResponse> => {
  const existingSupplier = await supplierRepository.findOne({
    where: { name: data.name },
  });

  if (existingSupplier) {
    throw new Error("Supplier already exists");
  }
  return await AppDataSource.transaction(async (manager) => {
    const supplierRepository = manager.getRepository(Supplier);
    const auditLogRepository = manager.getRepository(AuditLog);
    const supplier = supplierRepository.create(data);
    await supplierRepository.save(supplier);

    const dataLog = auditLogRepository.create({
      userId: data.userId,
      action: "create",
      entityType: "Supplier",
      entityId: supplier.id,
      changes: {
        name: supplier.name,
        email: supplier.email,
        creditLimit: supplier.creditLimit,
      },
    });

    await auditLogRepository.save(dataLog);

    return {
      id: supplier.id,
      name: supplier.name,
      email: supplier.email ?? "",
      creditLimit: supplier.creditLimit ?? 0,
    };
  });
};

const getListSupplier = async (): Promise<Supplier[]> => {
  const suppliers = await supplierRepository.find();
  return suppliers;
};

const findSupplierById = async (id: string): Promise<Supplier | null> => {
  const supplier = await supplierRepository.findOne({
    where: { id: id },
  });
  return supplier;
};

const SupplierService = {
  createSupplier,
  getListSupplier,
  findSupplierById,
};

export default SupplierService;
