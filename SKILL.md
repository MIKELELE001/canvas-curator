# SKILL: The Canvas Curator

## Overview

**Name:** The Canvas Curator  
**Version:** 1.0.0  
**Network:** Hedera Testnet  
**Type:** Conversational Commerce Agent  

The Canvas Curator is an AI-powered digital art dealer built on Hedera. It generates curated Pointillism Character Concepts, lets users select a piece, and executes an onchain micro-commerce interaction — transferring HBAR and logging the purchase to the Hedera Consensus Service.

---

## Skill Entry Point

`index.ts` — CLI-based conversational runner using readline.

---

## Hedera Services Used

| Service | Purpose |
|---|---|
| `TransferTransaction` | Execute 0.1 HBAR transfer (buyer → artist wallet) |
| `TopicMessageSubmitTransaction` | Log verified purchase to HCS topic |
| Hedera Testnet | All transactions run on testnet |

---

## Agent Capabilities

### 1. Collection Generation
- Generates exactly 3 unique Pointillism Character Concepts per session
- Each character has: name, lore, visual description, rarity (common / rare / mythic)
- Rarity assigned probabilistically: 15% mythic, 35% rare, 50% common

### 2. User Selection
- Accepts numeric input (1, 2, 3)
- Accepts ordinal words ("first", "second", "third")
- Accepts name-based selection (partial match)

### 3. Confirmation-Gated Commerce
- Always presents a confirmation prompt before executing any transaction
- Transaction only executes after explicit "yes" / "confirm" response
- "No" or "cancel" aborts cleanly — no HBAR movement

### 4. Onchain Execution
- HBAR transfer: buyer wallet → artist wallet (0.1 HBAR)
- HCS message: `Purchase Verified | {name} | Buyer: {wallet} | Price: 0.1 HBAR | Time: {timestamp}`

### 5. Receipt Reporting
- Returns transaction ID (txHash) on success
- Confirms HCS log submission

---

## Conversation Flow

```
User  →  "show me the collection"
Agent →  Displays 3 Pointillism Character Concepts

User  →  "second one" / "2" / character name
Agent →  "Confirm purchase for 0.1 HBAR? (yes / no)"

User  →  "yes"
Agent →  Executes HBAR transfer + HCS log → Returns TX hash

User  →  "no"
Agent →  "Transaction cancelled."
```

---

## Session State Machine

```
idle → browsing → confirming → idle
```

- `idle`: Waiting for browse intent
- `browsing`: Collection displayed, awaiting selection
- `confirming`: Character selected, awaiting purchase confirmation

---

## Environment Variables Required

```
HEDERA_ACCOUNT_ID     # Operator account (buyer)
HEDERA_PRIVATE_KEY    # Operator private key
ARTIST_WALLET_ID      # Recipient wallet for HBAR transfers
HCS_TOPIC_ID          # Hedera Consensus Service topic ID
```

---

## Module Map

| File | Responsibility |
|---|---|
| `core/curatorEngine.ts` | Intent detection + session routing |
| `core/characterGenerator.ts` | Generative art object creation |
| `core/selectionHandler.ts` | Parse user selection |
| `core/commerceEngine.ts` | Confirmation + execution orchestration |
| `core/hbarTransfer.ts` | Hedera HBAR transfer |
| `core/hcsLogger.ts` | Hedera Consensus Service logging |
| `data/characterTemplates.ts` | Archetype + lore template data |
| `data/artStyles.ts` | Pointillism style descriptors + rarity weights |
| `data/walletConfig.ts` | Network + wallet configuration |
| `utils/parser.ts` | Message parsing (selection, confirmation, intent) |
| `utils/promptBuilder.ts` | Agent message formatting |
| `utils/responseFormatter.ts` | Standardized response objects |

---

## Success Criteria (Week 1 Bounty)

- [x] AI-driven agent persona (The Curator)
- [x] 3-item generative art system per session
- [x] User selection interaction
- [x] Confirmation-gated commerce flow
- [x] Real HBAR transfer on Hedera testnet
- [x] HCS purchase log entry
- [x] Full end-to-end conversational agent flow
