import { Repository } from "typeorm";
import { AppDataSource } from "./../../config/data-source";
import { Supplier } from "../../entities/Suppliers";
import { CreateSupplierResponse } from "./supplier.model";

const supplierRepository: Repository<Supplier> =
  AppDataSource.getRepository(Supplier);

const createSupplier = async (
  data: Partial<Supplier>
): Promise<CreateSupplierResponse> => {
  const { name } = data;
  if (!name) {
    throw new Error("Missing required fields");
  }
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
const SupplierService = {
  createSupplier,
  getListSupplier,
};

export default SupplierService;
