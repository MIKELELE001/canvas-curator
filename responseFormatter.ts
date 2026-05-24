import { AgentResponse } from "../types/character";
import { TransactionResult } from "../types/transaction";

export function formatError(message: string): AgentResponse {
  return { message: `⚠️  ${message}` };
}

export function formatCancelResponse(): AgentResponse {
  return {
    message: "Transaction cancelled. The piece returns to the collection.\nCome back anytime.",
  };
}

export function formatAmbiguousSelection(): AgentResponse {
  return {
    message: "I didn't catch that. Reply with 1, 2, or 3 — or type the character's name.",
  };
}

export function formatAmbiguousConfirmation(): AgentResponse {
  return {
    message: "Please reply 'yes' to confirm the purchase, or 'no' to cancel.",
  };
}

export function formatSuccess(
  txResult: TransactionResult,
  characterName: string
): AgentResponse {
  return {
    message: `✅ ${characterName} is yours.\nTX: ${txResult.txHash}`,
    txHash: txResult.txHash,
  };
}

export function formatTransactionError(detail: string): AgentResponse {
  return {
    message: `❌ Transaction failed: ${detail}\nNo HBAR was deducted.`,
    error: detail,
  };
}

export function formatWelcome(): AgentResponse {
  return {
    message:
      `Welcome to The Canvas Curator.\n` +
      `I deal in Pointillism Character Concepts — generative, one-of-a-kind, onchain.\n` +
      `Say "show me the collection" to browse today's drop.`,
  };
}
