# The Canvas Curator

AI-powered digital art dealer built on Hedera Hashgraph.

## What it does
- Generates 3 unique Pointillism Character Concepts per session
- User selects a piece and confirms purchase
- Executes real HBAR transfer on Hedera testnet
- Logs every purchase to Hedera Consensus Service (HCS)

## Tech Stack
- TypeScript
- Hedera JS SDK (@hashgraph/sdk)
- Hedera Consensus Service
- Hedera Testnet

## How to run
```bash
npm install
cp .env.example .env
# Fill in your Hedera testnet credentials
npm run dev
```

## Built for
Hedera AI Studio Agent Bounty Campaign — Week 1
