import { Client, AccountId, PrivateKey } from "@hashgraph/sdk";

let clientInstance: Client | null = null;

// Lazy getter — only initializes when first called, after dotenv.config() has run
export function getHederaClient(): Client {
  if (!clientInstance) {
    const operatorId = process.env.HEDERA_ACCOUNT_ID;
    const operatorKey = process.env.HEDERA_PRIVATE_KEY;

    if (!operatorId || !operatorKey) {
      throw new Error("Missing HEDERA_ACCOUNT_ID or HEDERA_PRIVATE_KEY in environment.");
    }

    clientInstance = Client.forTestnet().setOperator(
      AccountId.fromString(operatorId),
      PrivateKey.fromString(operatorKey)
    );
  }
  return clientInstance;
}
