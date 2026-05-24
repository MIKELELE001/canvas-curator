import * as readline from "readline";
import * as dotenv from "dotenv";

// dotenv MUST run before any engine imports so env vars are populated at module load
dotenv.config();

import { processMessage } from "./core/curatorEngine";
import { UserSession } from "./types/userSession";

function validateEnv(): void {
  const required = ["HEDERA_ACCOUNT_ID", "HEDERA_PRIVATE_KEY", "ARTIST_WALLET_ID", "HCS_TOPIC_ID"];
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    console.error(`\n❌ Missing environment variables: ${missing.join(", ")}`);
    console.error("Copy .env.example → .env and fill in your Hedera testnet credentials.\n");
    process.exit(1);
  }
}

function createSession(): UserSession {
  return {
    userId: `session-${Date.now()}`,
    stage: "idle",
    walletAddress: process.env.HEDERA_ACCOUNT_ID!,
  };
}

async function main(): Promise<void> {
  validateEnv();

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  let session = createSession();

  console.log("\n🖼️   THE CANVAS CURATOR");
  console.log("━".repeat(42));
  console.log("AI-powered onchain art dealer.");
  console.log("Powered by Hedera Hashgraph + HCS.");
  console.log("━".repeat(42));
  console.log('Type "show me the collection" to begin, or "exit" to quit.\n');

  const prompt = (): void => {
    rl.question("You: ", async (input) => {
      const message = input.trim();

      if (!message) {
        prompt();
        return;
      }

      if (["exit", "quit", "bye"].includes(message.toLowerCase())) {
        console.log("\nThe Curator bows. Until next time.\n");
        rl.close();
        return;
      }

      try {
        const { response, updatedSession } = await processMessage(message, session);
        session = updatedSession;
        console.log(`\nCurator:\n${response.message}\n`);
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Unexpected error";
        console.error(`\n⚠️  Error: ${msg}\n`);
      }

      prompt();
    });
  };

  prompt();
}

main();
