import { TopicMessageSubmitTransaction, TopicId } from "@hashgraph/sdk";
import { getHederaClient } from "./hederaClient";

export async function submitHCSMessage(message: string): Promise<void> {
  const topicId = process.env.HCS_TOPIC_ID;

  if (!topicId) {
    throw new Error("HCS_TOPIC_ID is not set in environment.");
  }

  try {
    const client = getHederaClient();
    const txResponse = await new TopicMessageSubmitTransaction()
      .setTopicId(TopicId.fromString(topicId))
      .setMessage(message)
      .execute(client);

    await txResponse.getReceipt(client);
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`HCS submission failed: ${msg}`);
  }
}

export function buildPurchaseLog(
  characterName: string,
  buyerWallet: string,
  price: number
): string {
  const timestamp = new Date().toISOString();
  return `Purchase Verified | ${characterName} | Buyer: ${buyerWallet} | Price: ${price} HBAR | Time: ${timestamp}`;
}
