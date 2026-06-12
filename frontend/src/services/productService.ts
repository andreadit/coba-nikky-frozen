import { api } from "./api";
import type { Product } from "../types/product";

export interface ApiCategory {
  id: number;
  name: string;
}

export interface ApiBranch {
  id: number;
  name: string;
}

interface ApiInventory {
  branch_id: number;
  stock: number;
  minimum_stock: number;
  maximum_stock: number | null;
  branch?: {
    name: string;
  } | null;
}

interface ApiProduct {
  id: number;
  category_id: number | null;
  sku: string;
  name: string;
  unit: string;
  price: number;
  cost: number;
  expiry_date: string | null;
  is_active: boolean;
  category?: ApiCategory | null;
  inventories?: ApiInventory[];
}

export interface ProductFormPayload {
  category_id: number | null;
  branch_id: number;
  sku: string;
  name: string;
  unit: string;
  price: number;
  cost: number;
  stock: number;
  minimum_stock: number;
  maximum_stock: number | null;
  expiry_date: string | null;
  is_active: boolean;
}

function mapProduct(product: ApiProduct): Product {
  const inventory = product.inventories?.[0];

  return {
    id: product.id,
    categoryId: product.category_id,
    branchId: inventory?.branch_id,
    minimumStock: inventory?.minimum_stock ?? 0,
    maximumStock: inventory?.maximum_stock ?? null,
    sku: product.sku,
    name: product.name,
    category: product.category?.name ?? "-",
    unit: product.unit,
    price: product.price,
    cost: product.cost,
    stock: inventory?.stock ?? 0,
    branch: inventory?.branch?.name ?? "-",
    expiry: product.expiry_date
      ? product.expiry_date.slice(0, 10)
      : "",
    emoji: "",
  };
}

export async function getProducts() {
  const response =
    await api.get<ApiProduct[]>("/products");

  return response.data.map(mapProduct);
}

export async function getCategories() {
  const response =
    await api.get<ApiCategory[]>("/categories");

  return response.data;
}

export async function getBranches() {
  const response =
    await api.get<ApiBranch[]>("/branches");

  return response.data;
}

export async function createProduct(
  payload: ProductFormPayload
) {
  const response =
    await api.post<ApiProduct>(
      "/products",
      payload
    );

  return mapProduct(response.data);
}

export async function updateProduct(
  id: number,
  payload: ProductFormPayload
) {
  const response =
    await api.put<ApiProduct>(
      `/products/${id}`,
      payload
    );

  return mapProduct(response.data);
}

export async function deleteProduct(id: number) {
  await api.delete(`/products/${id}`);
}
