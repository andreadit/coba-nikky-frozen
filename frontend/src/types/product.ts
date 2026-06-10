// src/types/product.ts

export interface Product {
  id: number;
  sku: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  branch: string;
  expiry: string;
  emoji: string;
}