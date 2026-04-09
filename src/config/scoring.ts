export interface ScoringWeight {
  factor: string;
  weight: number;
  maxScore: number;
  description: string;
}

export const SCORING_WEIGHTS: ScoringWeight[] = [
  { factor: "nexaIdVerified", weight: 25, maxScore: 25, description: "Nexa ID verification status" },
  { factor: "walletAge", weight: 15, maxScore: 15, description: "Wallet age and history length" },
  { factor: "activityConsistency", weight: 20, maxScore: 20, description: "Consistency of on-chain activity" },
  { factor: "inflowStability", weight: 20, maxScore: 20, description: "Income/revenue stability over time" },
  { factor: "profileCompleteness", weight: 10, maxScore: 10, description: "Completeness of profile information" },
  { factor: "repaymentHistory", weight: 10, maxScore: 10, description: "Previous repayment reliability (if any)" },
];

export const RISK_TIERS = {
  low: { min: 75, label: "Low Risk", color: "green" },
  medium: { min: 50, label: "Medium Risk", color: "yellow" },
  high: { min: 0, label: "High Risk", color: "red" },
} as const;

export const ELIGIBILITY_THRESHOLDS = {
  creatorAdvance: {
    minTrustScore: 60,
    maxAdvanceMultiplier: 2.5,
    baseFeePercentage: 5,
    maxRepaymentDays: 90,
  },
  merchantFinance: {
    minTrustScore: 55,
    maxCapitalMultiplier: 3.0,
    baseFeeRate: 0.08,
    repaymentCycles: ["daily", "weekly", "monthly"],
  },
  defiCredit: {
    minTrustScore: 50,
    maxLTV: 0.8,
    baseInterestRate: 0.12,
    premiumPoolThreshold: 80,
  },
} as const;

export const TRUST_BADGES = {
  platinum: { min: 90, label: "Platinum Trust", multiplier: 1.5 },
  gold: { min: 75, label: "Gold Trust", multiplier: 1.25 },
  silver: { min: 60, label: "Silver Trust", multiplier: 1.0 },
  bronze: { min: 0, label: "Bronze Trust", multiplier: 0.75 },
} as const;

export const FACTOR_CALCULATIONS = {
  walletAge: (daysOld: number): number => {
    if (daysOld >= 365) return 1.0;
    if (daysOld >= 180) return 0.8;
    if (daysOld >= 90) return 0.6;
    if (daysOld >= 30) return 0.4;
    return 0.2;
  },
  activityConsistency: (monthsActive: number, totalMonths: number): number => {
    if (totalMonths === 0) return 0;
    const ratio = monthsActive / totalMonths;
    if (ratio >= 0.9) return 1.0;
    if (ratio >= 0.7) return 0.8;
    if (ratio >= 0.5) return 0.6;
    if (ratio >= 0.3) return 0.4;
    return 0.2;
  },
  inflowStability: (variance: number): number => {
    if (variance <= 0.1) return 1.0;
    if (variance <= 0.2) return 0.8;
    if (variance <= 0.35) return 0.6;
    if (variance <= 0.5) return 0.4;
    return 0.2;
  },
  profileCompleteness: (fieldsCompleted: number, totalFields: number): number => {
    return totalFields > 0 ? fieldsCompleted / totalFields : 0;
  },
  repaymentHistory: (onTimePayments: number, totalPayments: number): number => {
    if (totalPayments === 0) return 0.5;
    const ratio = onTimePayments / totalPayments;
    if (ratio >= 0.95) return 1.0;
    if (ratio >= 0.85) return 0.8;
    if (ratio >= 0.7) return 0.5;
    return 0.2;
  },
};

export const DEFAULT_SCORING_INPUTS = {
  nexaIdVerified: true,
  walletAgeDays: 180,
  monthsActive: 10,
  totalMonths: 12,
  inflowVariance: 0.15,
  fieldsCompleted: 8,
  totalFields: 10,
  onTimePayments: 0,
  totalPayments: 0,
};
