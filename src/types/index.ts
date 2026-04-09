// User profile types
export type ProfileType = "creator" | "merchant" | "defi";

export interface UserProfile {
  id: string;
  walletAddress: string;
  profileType: ProfileType;
  createdAt: string;
  updatedAt: string;
  nexaIdVerified: boolean;
  onboardingCompleted: boolean;
  profileData: CreatorProfile | MerchantProfile | DefiProfile;
}

export interface CreatorProfile {
  type: "creator";
  monthlyInflow: number;
  paymentFrequency: "weekly" | "biweekly" | "monthly" | "irregular";
  platforms: string[];
  contentCategory: string;
  audienceSize: number;
  yearsActive: number;
}

export interface MerchantProfile {
  type: "merchant";
  monthlySales: number;
  businessType: string;
  settlementFrequency: "daily" | "weekly" | "monthly";
  paymentMethods: string[];
  yearsInBusiness: number;
  averageTransactionSize: number;
}

export interface DefiProfile {
  type: "defi";
  preferredBorrowRange: { min: number; max: number };
  riskTolerance: "conservative" | "moderate" | "aggressive";
  previousDefiExperience: boolean;
  collateralTypes: string[];
  targetLTV: number;
}

// Nexa ID / Proof types
export interface NexaIdProof {
  id: string;
  proofType: ProofType;
  status: ProofStatus;
  createdAt: string;
  expiresAt: string;
  proofHash: string;
  attestationData: Record<string, unknown>;
  verifiedAt?: string;
}

export type ProofType =
  | "identity_verification"
  | "wallet_ownership"
  | "income_verification"
  | "activity_consistency"
  | "repayment_history"
  | "collateral_proof";

export type ProofStatus = "pending" | "verified" | "failed" | "expired";

export interface ProofVaultEntry {
  id: string;
  proofType: ProofType;
  displayName: string;
  description: string;
  status: ProofStatus;
  createdAt: string;
  expiresAt: string;
  proofHash: string;
}

// Eligibility types
export interface EligibilityResult {
  eligible: boolean;
  trustScore: number;
  riskTier: RiskTier;
  creatorAdvanceLimit: number;
  merchantFinanceLimit: number;
  defiBorrowLimit: number;
  reasons: EligibilityReason[];
  factors: ScoreFactor[];
  recommendations: string[];
  calculatedAt: string;
}

export type RiskTier = "low" | "medium" | "high";

export interface EligibilityReason {
  type: "positive" | "negative" | "neutral";
  message: string;
  impact: number;
}

export interface ScoreFactor {
  name: string;
  weight: number;
  score: number;
  maxScore: number;
  description: string;
}

// Product-specific eligibility
export interface CreatorAdvanceOffer {
  eligible: boolean;
  maxAdvance: number;
  suggestedAdvance: number;
  repaymentPeriod: number;
  feePercentage: number;
  repaymentSchedule: RepaymentSchedule[];
  trustBadge: TrustBadge;
  explanation: AIExplanation;
}

export interface MerchantFinanceOffer {
  eligible: boolean;
  availableCapital: number;
  suggestedAmount: number;
  feeRate: number;
  repaymentCycle: "daily" | "weekly" | "monthly";
  businessHealthScore: number;
  trustBadge: TrustBadge;
  explanation: AIExplanation;
}

export interface DefiCreditOffer {
  eligible: boolean;
  creditLimit: number;
  suggestedBorrow: number;
  interestRate: number;
  collateralFlexibility: "standard" | "enhanced" | "premium";
  poolAccess: "standard" | "premium";
  trustBadge: TrustBadge;
  explanation: AIExplanation;
}

export interface RepaymentSchedule {
  date: string;
  amount: number;
  status: "pending" | "paid" | "overdue";
}

export interface TrustBadge {
  tier: "bronze" | "silver" | "gold" | "platinum";
  score: number;
  label: string;
}

// AI Explanation types
export interface AIExplanation {
  summary: string;
  positiveFactors: string[];
  negativeFactors: string[];
  recommendations: string[];
  detailedAnalysis?: string;
}

// Verifier / Lender types
export interface Applicant {
  id: string;
  walletAddress: string;
  profileType: ProfileType;
  applicationDate: string;
  status: ApplicationStatus;
  eligibilityResult: EligibilityResult;
  proofs: NexaIdProof[];
  requestedProduct: "creator_advance" | "merchant_finance" | "defi_credit";
  requestedAmount: number;
}

export type ApplicationStatus =
  | "pending"
  | "under_review"
  | "approved"
  | "rejected"
  | "manual_review";

export interface VerifierDecision {
  applicantId: string;
  decision: "approve" | "reject" | "manual_review";
  approvedAmount?: number;
  notes?: string;
  decidedAt: string;
  decidedBy: string;
}

// Chain types
export interface ChainConfig {
  chainId: number;
  name: string;
  rpcUrl: string;
  explorerUrl: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  contracts: {
    proofVault: string;
    veloraRegistry: string;
  };
}

export interface WalletState {
  isConnected: boolean;
  address: string | null;
  chainId: number | null;
  isCorrectNetwork: boolean;
}

export interface TransactionResult {
  hash: string;
  status: "pending" | "confirmed" | "failed";
  explorerUrl: string;
}

// Onboarding types
export interface OnboardingState {
  currentStep: number;
  walletConnected: boolean;
  profileType: ProfileType | null;
  profileData: Partial<CreatorProfile | MerchantProfile | DefiProfile>;
  nexaIdStarted: boolean;
  nexaIdCompleted: boolean;
  eligibilityCalculated: boolean;
  completed: boolean;
}

// Demo data types
export interface DemoScenario {
  id: string;
  name: string;
  description: string;
  profile: UserProfile;
  eligibility: EligibilityResult;
  proofs: NexaIdProof[];
}
