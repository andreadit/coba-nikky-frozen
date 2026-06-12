// src/types/product.ts

export interface Product {
  id: number;
  categoryId?: number | null;
  branchId?: number | null;
  minimumStock?: number;
  maximumStock?: number | null;
  sku: string;
  name: string;
  category: string;
  unit?: string;
  price: number;
  cost?: number;
  stock: number;
  branch: string;
  expiry: string;
  emoji: string;
}
