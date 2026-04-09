# Velora ID

> **Nexa ID-powered private financial eligibility layer on HashKey Chain**

Velora ID helps creators, merchants, and DeFi users unlock funding and credit access through verifiable trust signals, privacy-preserving proof flows, and AI-powered financial explanations.

Built for the **HashKey Chain Horizon Hackathon**.

## 🏆 Hackathon Tracks

This project covers multiple HashKey Chain Horizon Hackathon tracks:

| Track | Implementation |
|-------|---------------|
| **ZKID** | Nexa ID-powered privacy-preserving identity verification |
| **PayFi** | Merchant financing based on verified sales data |
| **DeFi** | Under-collateralized credit access via trust signals |
| **AI** | AI-powered explanations for all eligibility decisions |

## ✨ Features

- **Nexa ID Integration** - Privacy-preserving identity and financial proofs
- **Transparent Scoring** - Weighted eligibility scoring system
- **Creator Advances** - Cash advances based on verified creator income
- **Merchant PayFi** - Working capital financing for businesses
- **DeFi Credit** - Under-collateralized borrowing via trust signals
- **AI Explanations** - Human-readable decision reasoning
- **Verifier Dashboard** - Admin panel for lenders/protocols
- **Proof Vault** - User-controlled proof management
- **HashKey Chain** - On-chain proof registration and verification

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/velora/velora-id
cd velora-id

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (app)/              # Authenticated app pages
│   │   ├── dashboard/      # Main dashboard
│   │   ├── creator/        # Creator advance module
│   │   ├── merchant/       # Merchant PayFi module
│   │   ├── defi/           # DeFi credit module
│   │   ├── proof-vault/    # User proof management
│   │   ├── verifier/       # Lender/verifier dashboard
│   │   └── onboarding/     # Multi-step onboarding
│   ├── (marketing)/        # Public marketing pages
│   ├── docs/               # Documentation page
│   └── api/                # API routes
├── components/             # React components
│   ├── ui/                 # Reusable UI primitives
│   ├── layout/             # Layout components
│   └── ...                 # Feature components
├── services/               # Business logic services
│   ├── nexa-id.ts          # Nexa ID integration
│   ├── eligibility.ts      # Scoring engine
│   ├── ai-explanation.ts   # AI explanations
│   └── chain.ts            # HashKey Chain integration
├── config/                 # Configuration
│   ├── chain.ts            # HashKey Chain config
│   └── scoring.ts          # Scoring weights
├── types/                  # TypeScript types
├── lib/                    # Utility functions
├── hooks/                  # React hooks
└── data/                   # Demo data
```

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod
- **Charts**: Recharts
- **Blockchain**: HashKey Chain (testnet)

## 🔐 How It Works

### 1. Connect Wallet
Users connect their wallet to begin the verification process on HashKey Chain.

### 2. Generate Proofs
Nexa ID generates privacy-preserving proofs of identity, income, and activity without exposing raw data.

### 3. Calculate Eligibility
The transparent scoring engine evaluates:
- Nexa ID verification status (25 points)
- Wallet age/history (15 points)
- Activity consistency (20 points)
- Income stability (20 points)
- Profile completeness (10 points)
- Repayment history (10 points)

### 4. Unlock Products
Based on trust score, users can access:
- **Creator Advance**: Up to 2.5x monthly inflow
- **Merchant PayFi**: Up to 3x monthly sales
- **DeFi Credit**: Trust-based borrowing limits

## 🎯 Eligibility Scoring

| Factor | Weight | Description |
|--------|--------|-------------|
| Nexa ID Verified | 25 pts | Identity verification status |
| Wallet History | 15 pts | Age and activity of wallet |
| Activity Consistency | 20 pts | Regular on-chain activity |
| Income Stability | 20 pts | Revenue/income variance |
| Profile Complete | 10 pts | Profile field completion |
| Repayment History | 10 pts | Previous loan repayments |

### Trust Badges

| Badge | Score Range | Limit Multiplier |
|-------|-------------|------------------|
| Platinum | 90-100 | 1.5x |
| Gold | 75-89 | 1.25x |
| Silver | 60-74 | 1.0x |
| Bronze | 0-59 | 0.75x |

## 🌐 HashKey Chain Integration

Velora ID is built specifically for HashKey Chain:

- **Chain ID**: 133 (testnet)
- **RPC URL**: https://testnet.hsk.xyz
- **Explorer**: https://testnet-explorer.hsk.xyz

The app includes:
- Network detection and switching
- Proof registration on-chain
- Transaction helpers
- Explorer links

## 🔮 Future Roadmap

- [ ] Production smart contract deployment
- [ ] Real LLM integration for AI explanations
- [ ] Multi-chain expansion
- [ ] Mobile app for proof generation
- [ ] Additional DeFi protocol integrations
- [ ] Regulatory compliance features

## 🔒 Privacy & Security

- **Zero-Knowledge Proofs**: No raw data exposed
- **User-Controlled**: Users own their proofs
- **On-Chain Verification**: Transparent, auditable
- **No Centralized Storage**: Proofs stored locally

## 📄 Environment Variables

```env
# HashKey Chain
NEXT_PUBLIC_HASHKEY_RPC_URL=https://testnet.hsk.xyz
NEXT_PUBLIC_HASHKEY_CHAIN_ID=133
NEXT_PUBLIC_EXPLORER_URL=https://testnet-explorer.hsk.xyz

# Contracts (deploy your own)
NEXT_PUBLIC_PROOF_VAULT_CONTRACT=0x...
NEXT_PUBLIC_VELORA_REGISTRY_CONTRACT=0x...

# Feature Flags
NEXT_PUBLIC_MOCK_MODE=true
NEXT_PUBLIC_DEBUG=false

# Nexa ID
NEXT_PUBLIC_NEXA_ID_ENDPOINT=https://mock-nexa-id.velora.dev
```

## 🏗 Development

```bash
# Run dev server
npm run dev

# Build for production
npm run build

# Run production build
npm start

# Lint code
npm run lint
```

## 📝 License

MIT License - see LICENSE file for details.

---

**Built with ❤️ for HashKey Chain Horizon Hackathon**
