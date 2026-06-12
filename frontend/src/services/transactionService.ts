import { api } from "./api";

export interface CheckoutItem {
  product_id: number;
  qty: number;
}

export interface CheckoutPayload {
  branch_id: number;
  paid_amount?: number;
  discount?: number;
  tax?: number;
  payment_method: "cash" | "midtrans";
  items: CheckoutItem[];
}

export interface CheckoutResponse {
  id: number;
  invoice_no: string;
  total: number;
  status: string;
}

export async function createTransaction(
  payload: CheckoutPayload
) {
  const response =
    await api.post<CheckoutResponse>(
      "/transactions",
      payload
    );

  return response.data;
}
