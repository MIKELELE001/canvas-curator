import { AgentResponse } from "../types/character";
import { UserSession } from "../types/userSession";
import { generateCollection } from "./characterGenerator";
import { handleSelection } from "./selectionHandler";
import { handleCommerce } from "./commerceEngine";
import { buildGalleryPrompt } from "../utils/promptBuilder";
import { formatWelcome } from "../utils/responseFormatter";
import { parseBrowseIntent } from "../utils/parser";

interface EngineResult {
  response: AgentResponse;
  updatedSession: UserSession;
}

export async function processMessage(
  userMessage: string,
  session: UserSession
): Promise<EngineResult> {
  // Awaiting purchase confirmation — highest priority check
  if (session.stage === "confirming" && session.selectedCharacter) {
    return handleCommerce(userMessage, session);
  }

  // Browse intent always spawns a fresh collection — fixes the browsing state trap
  if (parseBrowseIntent(userMessage)) {
    return spawnNewCollection(session);
  }

  // Active browsing session — route to selection handler
  if (session.stage === "browsing" && session.currentCollection) {
    return handleSelection(userMessage, session);
  }

  // First message or unknown input
  return {
    response: formatWelcome(),
    updatedSession: { ...session, stage: "idle" },
  };
}

function spawnNewCollection(session: UserSession): EngineResult {
  const collection = generateCollection();
  const updatedSession: UserSession = {
    ...session,
    stage: "browsing",
    currentCollection: collection,
    selectedCharacter: undefined,
  };
  return {
    response: { message: buildGalleryPrompt(collection), characters: collection },
    updatedSession,
  };
}
