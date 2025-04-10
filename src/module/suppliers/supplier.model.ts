interface CreateSupplierRequest {
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface CreateSupplierResponse {
  id: string;
  name: string;
  email: string;
  creditLimit: number;
}

export type { CreateSupplierRequest, CreateSupplierResponse };
