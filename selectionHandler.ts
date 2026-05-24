import { AgentResponse } from "../types/character";
import { UserSession } from "../types/userSession";
import { parseSelection } from "../utils/parser";
import { buildConfirmationPrompt } from "../utils/promptBuilder";
import { formatAmbiguousSelection } from "../utils/responseFormatter";

interface SelectionResult {
  response: AgentResponse;
  updatedSession: UserSession;
}

export function handleSelection(
  userMessage: string,
  session: UserSession
): SelectionResult {
  const characters = session.currentCollection;

  if (!characters || characters.length === 0) {
    return {
      response: { message: "No collection loaded. Say 'show me art' to browse." },
      updatedSession: session,
    };
  }

  const selected = parseSelection(userMessage, characters);

  if (!selected) {
    return {
      response: formatAmbiguousSelection(),
      updatedSession: session,
    };
  }

  const updatedSession: UserSession = {
    ...session,
    stage: "confirming",
    selectedCharacter: selected,
  };

  return {
    response: { message: buildConfirmationPrompt(selected) },
    updatedSession,
  };
}
