import { Character } from "./character";

export type SessionStage = "idle" | "browsing" | "selected" | "confirming";

export interface UserSession {
  userId: string;
  stage: SessionStage;
  walletAddress: string;
  selectedCharacter?: Character;
  currentCollection?: Character[];
}
