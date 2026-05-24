import { AgentResponse } from "../types/character";
import { UserSession } from "../types/userSession";
import { sendHBAR } from "./hbarTransfer";
import { submitHCSMessage, buildPurchaseLog } from "./hcsLogger";
import { getDefaultConfig } from "../data/walletConfig";
import { parseConfirmation } from "../utils/parser";
import {
  formatCancelResponse,
  formatAmbiguousConfirmation,
  formatTransactionError,
} from "../utils/responseFormatter";
import { buildReceiptMessage } from "../utils/promptBuilder";

interface CommerceResult {
  response: AgentResponse;
  updatedSession: UserSession;
}

export async function handleCommerce(
  userMessage: string,
  session: UserSession
): Promise<CommerceResult> {
  const confirmed = parseConfirmation(userMessage);

  if (confirmed === null) {
    return { response: formatAmbiguousConfirmation(), updatedSession: session };
  }

  if (!confirmed) {
    const clearedSession: UserSession = {
      ...session,
      stage: "idle",
      selectedCharacter: undefined,
    };
    return { response: formatCancelResponse(), updatedSession: clearedSession };
  }

  const character = session.selectedCharacter!;
  const config = getDefaultConfig();

  try {
    const txResult = await sendHBAR({
      from: session.walletAddress,
      to: config.artistWalletId,
      amount: character.price,
    });

    if (txResult.status === "failed") {
      return {
        response: formatTransactionError("Transfer returned a failed status."),
        updatedSession: session, // Keep session alive for retry
      };
    }

    try {
      const log = buildPurchaseLog(character.name, session.walletAddress, character.price);
      await submitHCSMessage(log);
    } catch {
      console.warn("HCS log failed, but transfer succeeded.");
    }

    const resetSession: UserSession = {
      ...session,
      stage: "idle",
      selectedCharacter: undefined,
    };
    const receipt = buildReceiptMessage(txResult.txHash, character.name, character.price);
    return {
      response: { message: receipt, txHash: txResult.txHash },
      updatedSession: resetSession,
    };
  } catch (error) {
    const detail = error instanceof Error ? error.message : "Unknown error";
    return {
      response: formatTransactionError(detail),
      updatedSession: session, // Keep session alive for retry
    };
  }
}
