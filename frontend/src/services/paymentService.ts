import { api } from "./api";

export interface MidtransSnapResponse {
  transaction: {
    id: number;
    invoice_no: string;
    total: number;
    status: string;
  };
  snap_token: string;
  redirect_url: string;
}

export async function createMidtransPayment(
  transactionId: number
) {
  const response =
    await api.post<MidtransSnapResponse>(
      `/payments/midtrans/snap/${transactionId}`
    );

  return response.data;
}
