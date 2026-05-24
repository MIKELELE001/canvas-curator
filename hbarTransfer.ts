import { TransferTransaction, Hbar, AccountId, Status } from "@hashgraph/sdk";
import { getHederaClient } from "./hederaClient";
import { TransferParams, TransactionResult } from "../types/transaction";

export async function sendHBAR(params: TransferParams): Promise<TransactionResult> {
  try {
    const client = getHederaClient();
    const txResponse = await new TransferTransaction()
      .addHbarTransfer(AccountId.fromString(params.from), new Hbar(-params.amount))
      .addHbarTransfer(AccountId.fromString(params.to), new Hbar(params.amount))
      .execute(client);

    const receipt = await txResponse.getReceipt(client);
    const succeeded = receipt.status === Status.Success;

    return {
      txHash: txResponse.transactionId.toString(),
      status: succeeded ? "success" : "failed",
      amount: params.amount,
      buyer: params.from,
      seller: params.to,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown SDK error";
    throw new Error(`HBAR transfer failed: ${message}`);
  }
}
