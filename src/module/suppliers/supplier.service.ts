import { Repository } from "typeorm";
import { AppDataSource } from "./../../config/data-source";
import { Supplier } from "../../entities/Suppliers";
import { CreateSupplierRequest, CreateSupplierResponse } from "./supplier.dto";

const supplierRepository: Repository<Supplier> =
  AppDataSource.getRepository(Supplier);

const createSupplier = async (
  data: CreateSupplierRequest
): Promise<CreateSupplierResponse> => {
  const existingSupplier = await supplierRepository.findOne({
    where: { name: data.name },
  });
  if (existingSupplier) {
    throw new Error("Supplier already exists");
  }
  const supplier = supplierRepository.create(data);
  await supplierRepository.save(supplier);
  return {
    id: supplier.id,
    name: supplier.name,
    email: supplier.email ?? "",
    creditLimit: supplier.creditLimit ?? 0,
  };
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
