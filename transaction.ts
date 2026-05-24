export interface TransactionResult {
  txHash: string;
  status: "success" | "failed";
  amount: number;
  buyer: string;
  seller: string;
}

export interface TransferParams {
  from: string;
  to: string;
  amount: number;
}
