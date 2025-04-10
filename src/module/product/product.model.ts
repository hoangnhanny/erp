interface CreateProductRequest {
  name: string;
  sku: string;
  category?: string;
  unitPrice?: number;
  stock?: number;
  pendingStock?: number;
}

interface CreateProductResponse {
  id: string;
  name: string;
  sku: string;
  category: string | null;
  unitPrice: number;
  stock: number;
  pendingStock?: number;
}

interface UpdateProductRequest {
  id: string;
  name?: string;
  category?: string;
  unitPrice?: number;
  stock?: number;
  pendingStock?: number;
}
interface UpdateProductResponse {
  id: string;
  name: string;
  sku: string;
  category: string | null;
  unitPrice: number;
  stock: number;
  pendingStock?: number;
}

export type {
  CreateProductRequest,
  CreateProductResponse,
  UpdateProductRequest,
  UpdateProductResponse,
};
