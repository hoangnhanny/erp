import { Supplier } from "../../entities/Suppliers";
import { ResponseData } from "../../type/response.type";
import { CreateSupplierResponse } from "./supplier.dto";
import SupplierService from "./supplier.service";
import { Request } from "express";

const createSupplier = async (
  req: Request
): Promise<ResponseData<CreateSupplierResponse>> => {
  try {
    const supplier = await SupplierService.createSupplier(req.body);
    return {
      status: 201,
      message: "Supplier created successfully",
      data: supplier,
    };
  } catch (error) {
    return {
      data: null,
      status: 500,
      message: error instanceof Error ? error.message : "Internal Server Error",
    };
  }
};

const getListSupplier = async (
  req: Request
): Promise<ResponseData<Supplier[]>> => {
  try {
    const suppliers = await SupplierService.getListSupplier();
    return {
      status: 200,
      message: "Suppliers retrieved successfully",
      data: suppliers,
    };
  } catch (error) {
    return {
      data: null,
      status: 500,
      message: error instanceof Error ? error.message : "Internal Server Error",
    };
  }
};

const SupplierController = {
  createSupplier,
  getListSupplier,
};

export default SupplierController;
