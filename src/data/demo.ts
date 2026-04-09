// Demo Data for Hackathon Showcase
import {
  UserProfile,
  EligibilityResult,
  NexaIdProof,
  DemoScenario,
  CreatorProfile,
  MerchantProfile,
  DefiProfile,
} from "@/types";

// Approved Creator Demo
const approvedCreatorProfile: UserProfile = {
  id: "demo-creator-1",
  walletAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595f5aB12",
  profileType: "creator",
  createdAt: "2024-01-15T10:00:00Z",
  updatedAt: "2024-03-01T14:30:00Z",
  nexaIdVerified: true,
  onboardingCompleted: true,
  profileData: {
    type: "creator",
    monthlyInflow: 8500,
    paymentFrequency: "biweekly",
    platforms: ["YouTube", "Patreon", "TikTok"],
    contentCategory: "Technology Reviews",
    audienceSize: 125000,
    yearsActive: 3,
  } as CreatorProfile,
};

const approvedCreatorEligibility: EligibilityResult = {
  eligible: true,
  trustScore: 82,
  riskTier: "low",
  creatorAdvanceLimit: 21250,
  merchantFinanceLimit: 0,
  defiBorrowLimit: 0,
  reasons: [
    { type: "positive", message: "Strong identity verification through Nexa ID", impact: 25 },
    { type: "positive", message: "Consistent bi-weekly payment pattern", impact: 18 },
    { type: "positive", message: "3+ years of creator activity", impact: 15 },
    { type: "neutral", message: "No previous repayment history", impact: 5 },
  ],
  factors: [
    { name: "Nexa ID Verification", weight: 25, score: 25, maxScore: 25, description: "Identity verified" },
    { name: "Wallet History", weight: 15, score: 12, maxScore: 15, description: "180+ days active" },
    { name: "Activity Consistency", weight: 20, score: 18, maxScore: 20, description: "Active 11/12 months" },
    { name: "Income Stability", weight: 20, score: 16, maxScore: 20, description: "15% variance" },
    { name: "Profile Completeness", weight: 10, score: 9, maxScore: 10, description: "9/10 fields" },
    { name: "Repayment History", weight: 10, score: 5, maxScore: 10, description: "No history" },
  ],
  recommendations: [
    "Start with a smaller advance to build repayment history",
    "Maintain consistent posting schedule",
  ],
  calculatedAt: new Date().toISOString(),
};

// Approved Merchant Demo
const approvedMerchantProfile: UserProfile = {
  id: "demo-merchant-1",
  walletAddress: "0x8Ba1f109551bD432803012645Ac136ddd64DBA72",
  profileType: "merchant",
  createdAt: "2023-08-20T08:00:00Z",
  updatedAt: "2024-02-28T16:45:00Z",
  nexaIdVerified: true,
  onboardingCompleted: true,
  profileData: {
    type: "merchant",
    monthlySales: 45000,
    businessType: "E-commerce",
    settlementFrequency: "weekly",
    paymentMethods: ["Card", "Crypto", "PayPal"],
    yearsInBusiness: 4,
    averageTransactionSize: 85,
  } as MerchantProfile,
};

const approvedMerchantEligibility: EligibilityResult = {
  eligible: true,
  trustScore: 78,
  riskTier: "low",
  creatorAdvanceLimit: 0,
  merchantFinanceLimit: 135000,
  defiBorrowLimit: 0,
  reasons: [
    { type: "positive", message: "Verified business identity", impact: 25 },
    { type: "positive", message: "Strong sales consistency", impact: 16 },
    { type: "positive", message: "4 years in business", impact: 12 },
  ],
  factors: [
    { name: "Nexa ID Verification", weight: 25, score: 25, maxScore: 25, description: "Business verified" },
    { name: "Wallet History", weight: 15, score: 13, maxScore: 15, description: "400+ days active" },
    { name: "Activity Consistency", weight: 20, score: 16, maxScore: 20, description: "Weekly settlements" },
    { name: "Income Stability", weight: 20, score: 14, maxScore: 20, description: "20% variance" },
    { name: "Profile Completeness", weight: 10, score: 10, maxScore: 10, description: "Complete" },
    { name: "Repayment History", weight: 10, score: 5, maxScore: 10, description: "New borrower" },
  ],
  recommendations: ["Consider daily settlement for better rates"],
  calculatedAt: new Date().toISOString(),
};

// Approved DeFi Borrower Demo
const approvedDefiProfile: UserProfile = {
  id: "demo-defi-1",
  walletAddress: "0x4E83362442B8d1BeC281594CEA3050c8EB01311C",
  profileType: "defi",
  createdAt: "2023-05-10T12:00:00Z",
  updatedAt: "2024-03-02T09:15:00Z",
  nexaIdVerified: true,
  onboardingCompleted: true,
  profileData: {
    type: "defi",
    preferredBorrowRange: { min: 10000, max: 50000 },
    riskTolerance: "moderate",
    previousDefiExperience: true,
    collateralTypes: ["ETH", "WBTC", "stablecoins"],
    targetLTV: 0.65,
  } as DefiProfile,
};

const approvedDefiEligibility: EligibilityResult = {
  eligible: true,
  trustScore: 85,
  riskTier: "low",
  creatorAdvanceLimit: 0,
  merchantFinanceLimit: 0,
  defiBorrowLimit: 40000,
  reasons: [
    { type: "positive", message: "Verified DeFi participant identity", impact: 25 },
    { type: "positive", message: "Strong on-chain activity", impact: 18 },
    { type: "positive", message: "Previous DeFi experience", impact: 12 },
  ],
  factors: [
    { name: "Nexa ID Verification", weight: 25, score: 25, maxScore: 25, description: "Verified" },
    { name: "Wallet History", weight: 15, score: 14, maxScore: 15, description: "600+ days" },
    { name: "Activity Consistency", weight: 20, score: 18, maxScore: 20, description: "Very active" },
    { name: "Income Stability", weight: 20, score: 16, maxScore: 20, description: "Stable" },
    { name: "Profile Completeness", weight: 10, score: 10, maxScore: 10, description: "Complete" },
    { name: "Repayment History", weight: 10, score: 8, maxScore: 10, description: "Good history" },
  ],
  recommendations: ["Consider premium pool for better rates"],
  calculatedAt: new Date().toISOString(),
};

// Rejected Applicant Demo
const rejectedProfile: UserProfile = {
  id: "demo-rejected-1",
  walletAddress: "0x1234567890AbCdEf1234567890AbCdEf12345678",
  profileType: "creator",
  createdAt: "2024-02-25T14:00:00Z",
  updatedAt: "2024-02-28T10:00:00Z",
  nexaIdVerified: false,
  onboardingCompleted: true,
  profileData: {
    type: "creator",
    monthlyInflow: 1200,
    paymentFrequency: "irregular",
    platforms: ["TikTok"],
    contentCategory: "Lifestyle",
    audienceSize: 5000,
    yearsActive: 0.5,
  } as CreatorProfile,
};

const rejectedEligibility: EligibilityResult = {
  eligible: false,
  trustScore: 32,
  riskTier: "high",
  creatorAdvanceLimit: 0,
  merchantFinanceLimit: 0,
  defiBorrowLimit: 0,
  reasons: [
    { type: "negative", message: "Identity not verified", impact: 0 },
    { type: "negative", message: "Irregular payment pattern", impact: 8 },
    { type: "negative", message: "Short activity history", impact: 6 },
  ],
  factors: [
    { name: "Nexa ID Verification", weight: 25, score: 0, maxScore: 25, description: "Not verified" },
    { name: "Wallet History", weight: 15, score: 4, maxScore: 15, description: "30 days" },
    { name: "Activity Consistency", weight: 20, score: 8, maxScore: 20, description: "Irregular" },
    { name: "Income Stability", weight: 20, score: 8, maxScore: 20, description: "High variance" },
    { name: "Profile Completeness", weight: 10, score: 7, maxScore: 10, description: "7/10" },
    { name: "Repayment History", weight: 10, score: 5, maxScore: 10, description: "None" },
  ],
  recommendations: [
    "Complete Nexa ID verification for +25 points",
    "Build 3+ months of consistent activity",
    "Establish regular income pattern",
  ],
  calculatedAt: new Date().toISOString(),
};

// Pending Verification Demo
const pendingProfile: UserProfile = {
  id: "demo-pending-1",
  walletAddress: "0xAbCdEf1234567890AbCdEf1234567890AbCdEf12",
  profileType: "merchant",
  createdAt: "2024-02-20T11:00:00Z",
  updatedAt: "2024-02-28T15:30:00Z",
  nexaIdVerified: false,
  onboardingCompleted: false,
  profileData: {
    type: "merchant",
    monthlySales: 25000,
    businessType: "Services",
    settlementFrequency: "monthly",
    paymentMethods: ["Card"],
    yearsInBusiness: 2,
    averageTransactionSize: 150,
  } as MerchantProfile,
};

// Demo proofs
const demoProofs: NexaIdProof[] = [
  {
    id: "proof-1",
    proofType: "identity_verification",
    status: "verified",
    createdAt: "2024-02-01T10:00:00Z",
    expiresAt: "2024-05-01T10:00:00Z",
    proofHash: "0xabc123def456789abc123def456789abc123def456789abc123def456789abcd",
    attestationData: { method: "nexa-id-v1" },
    verifiedAt: "2024-02-01T10:05:00Z",
  },
  {
    id: "proof-2",
    proofType: "wallet_ownership",
    status: "verified",
    createdAt: "2024-02-01T10:10:00Z",
    expiresAt: "2024-05-01T10:10:00Z",
    proofHash: "0xdef789abc123456def789abc123456def789abc123456def789abc123456efab",
    attestationData: { walletAge: 180 },
    verifiedAt: "2024-02-01T10:12:00Z",
  },
  {
    id: "proof-3",
    proofType: "income_verification",
    status: "verified",
    createdAt: "2024-02-01T10:20:00Z",
    expiresAt: "2024-05-01T10:20:00Z",
    proofHash: "0x123456789abcdef123456789abcdef123456789abcdef123456789abcdef1234",
    attestationData: { monthlyInflow: 8500 },
    verifiedAt: "2024-02-01T10:25:00Z",
  },
  {
    id: "proof-4",
    proofType: "activity_consistency",
    status: "verified",
    createdAt: "2024-02-01T10:30:00Z",
    expiresAt: "2024-05-01T10:30:00Z",
    proofHash: "0x789abcdef123456789abcdef123456789abcdef123456789abcdef123456cdef",
    attestationData: { monthsActive: 11, totalMonths: 12 },
    verifiedAt: "2024-02-01T10:35:00Z",
  },
];

const pendingProofs: NexaIdProof[] = [
  {
    id: "proof-pending-1",
    proofType: "identity_verification",
    status: "pending",
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    proofHash: "",
    attestationData: {},
  },
];

// Export demo scenarios
export const DEMO_SCENARIOS: DemoScenario[] = [
  {
    id: "approved-creator",
    name: "Approved Creator",
    description: "Tech reviewer with strong verification and income stability",
    profile: approvedCreatorProfile,
    eligibility: approvedCreatorEligibility,
    proofs: demoProofs,
  },
  {
    id: "approved-merchant",
    name: "Approved Merchant",
    description: "E-commerce business with verified sales history",
    profile: approvedMerchantProfile,
    eligibility: approvedMerchantEligibility,
    proofs: demoProofs,
  },
  {
    id: "approved-defi",
    name: "Approved DeFi Borrower",
    description: "Experienced DeFi user with strong on-chain history",
    profile: approvedDefiProfile,
    eligibility: approvedDefiEligibility,
    proofs: demoProofs,
  },
  {
    id: "rejected",
    name: "Rejected Applicant",
    description: "New creator with insufficient verification",
    profile: rejectedProfile,
    eligibility: rejectedEligibility,
    proofs: [],
  },
  {
    id: "pending",
    name: "Pending Verification",
    description: "Merchant awaiting identity verification",
    profile: pendingProfile,
    eligibility: rejectedEligibility,
    proofs: pendingProofs,
  },
];

export function getDemoScenario(id: string): DemoScenario | undefined {
  return DEMO_SCENARIOS.find((s) => s.id === id);
}

export function getDefaultDemoScenario(): DemoScenario {
  return DEMO_SCENARIOS[0];
}

// Demo applicants for verifier dashboard
export const DEMO_APPLICANTS = DEMO_SCENARIOS.map((scenario) => ({
  id: scenario.profile.id,
  walletAddress: scenario.profile.walletAddress,
  profileType: scenario.profile.profileType,
  applicationDate: scenario.profile.createdAt,
  status: scenario.eligibility.eligible ? "pending" : "rejected",
  eligibilityResult: scenario.eligibility,
  proofs: scenario.proofs,
  requestedProduct:
    scenario.profile.profileType === "creator"
      ? "creator_advance"
      : scenario.profile.profileType === "merchant"
        ? "merchant_finance"
        : "defi_credit",
  requestedAmount:
    scenario.eligibility.creatorAdvanceLimit ||
    scenario.eligibility.merchantFinanceLimit ||
    scenario.eligibility.defiBorrowLimit ||
    10000,
}));
