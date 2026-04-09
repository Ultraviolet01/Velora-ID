// Eligibility Scoring Service
import {
  EligibilityResult,
  RiskTier,
  ScoreFactor,
  EligibilityReason,
  CreatorProfile,
  MerchantProfile,
  DefiProfile,
  ProfileType,
} from "@/types";
import {
  SCORING_WEIGHTS,
  RISK_TIERS,
  ELIGIBILITY_THRESHOLDS,
  TRUST_BADGES,
  FACTOR_CALCULATIONS,
} from "@/config/scoring";
import { MultiChainStats } from "./multi-chain";

export interface ScoringInputs {
  nexaIdVerified: boolean;
  kycLevel?: number;
  kycStatus?: number;
  // Native (HashKey) stats
  nativeStats: {
    walletAgeDays: number;
    transactionCount: number;
    activityMonths: number;
  };
  // Cross-Chain stats (from MultiChainService)
  crossChainStats?: MultiChainStats;
  // User profile data
  fieldsCompleted: number;
  totalFields: number;
  onTimePayments: number;
  totalPayments: number;
  monthlyInflow?: number;
  monthlySales?: number;
  collateralValue?: number;
}

class EligibilityService {
  calculateEligibility(
    inputs: ScoringInputs,
    profileType: ProfileType,
    profileData: Partial<CreatorProfile | MerchantProfile | DefiProfile>
  ): EligibilityResult {
    const factors = this.calculateFactors(inputs);
    const trustScore = this.calculateTrustScore(factors);
    const riskTier = this.determineRiskTier(trustScore);
    const reasons = this.generateReasons(factors, trustScore);
    const recommendations = this.generateRecommendations(factors, trustScore);

    // Calculate product-specific limits
    const creatorAdvanceLimit = this.calculateCreatorLimit(trustScore, inputs, profileType);
    const merchantFinanceLimit = this.calculateMerchantLimit(trustScore, inputs, profileType);
    const defiBorrowLimit = this.calculateDefiLimit(trustScore, inputs, profileType);

    const eligible = trustScore >= this.getMinScoreForProfile(profileType);

    return {
      eligible,
      trustScore,
      riskTier,
      creatorAdvanceLimit,
      merchantFinanceLimit,
      defiBorrowLimit,
      reasons,
      factors,
      recommendations,
      calculatedAt: new Date().toISOString(),
    };
  }

  private calculateFactors(inputs: ScoringInputs): ScoreFactor[] {
    const factors: ScoreFactor[] = [];

    // --- NATIVE REPUTATION (50% WEIGHT) ---
    const nativeWeight = 50;
    
    // HashKey KYC Verification (Foundational for Native) - 15 points
    // Level 1 (BASIC) = 10 points, Level 2+ (ADVANCED+) = 15 points
    let kycScore = 0;
    let kycDescription = "Identity not yet verified on HashKey Chain";

    if (inputs.kycStatus === 1) { // APPROVED
      if (inputs.kycLevel && inputs.kycLevel >= 2) {
        kycScore = 15;
        kycDescription = "Advanced Identity Verified (HashKey KYC Level 2+)";
      } else if (inputs.kycLevel === 1) {
        kycScore = 10;
        kycDescription = "Basic Identity Verified (HashKey KYC Level 1)";
      } else {
        kycScore = 5;
        kycDescription = "Proof of Humanity Verified (HashKey KYC Level 0)";
      }
    } else if (inputs.nexaIdVerified) {
      // Fallback to Nexa ID if HashKey KYC isn't present
      kycScore = 12;
      kycDescription = "Identity verified via Nexa ID (Legacy)";
    }

    factors.push({
      name: "Identity Verified",
      weight: 15,
      score: kycScore,
      maxScore: 15,
      description: kycDescription,
    });

    // Native Activity Consistency - 20 points
    const nativeActivityMultiplier = FACTOR_CALCULATIONS.activityConsistency(
      inputs.nativeStats.activityMonths,
      12 // Base 12 months for benchmark
    );
    const nativeActivityScore = Math.round(20 * nativeActivityMultiplier);
    factors.push({
      name: "Native Activity",
      weight: 20,
      score: nativeActivityScore,
      maxScore: 20,
      description: `Active ${inputs.nativeStats.activityMonths} months on HashKey Chain`,
    });

    // Native Wallet History - 15 points
    const nativeAgeMultiplier = FACTOR_CALCULATIONS.walletAge(inputs.nativeStats.walletAgeDays);
    const nativeAgeScore = Math.round(15 * nativeAgeMultiplier);
    factors.push({
      name: "Native History",
      weight: 15,
      score: nativeAgeScore,
      maxScore: 15,
      description: `HashKey wallet age: ${inputs.nativeStats.walletAgeDays} days`,
    });

    // --- CROSS-CHAIN REPUTATION (50% WEIGHT) ---
    const crossChainWeight = 50;
    let crossChainScore = 0;
    let crossChainDescription = "No cross-chain activity detected";

    if (inputs.crossChainStats) {
      const stats = inputs.crossChainStats;
      
      // Calculate Cross-Chain score based on active chains and total volume
      const chainCountScore = Math.min(stats.overall.activeChainsCount * 10, 30); // 10 points per chain, max 30
      const volumeScore = Math.min(Math.floor(stats.overall.totalTxCount / 20), 20); // 1 point per 20 txs, max 20
      
      crossChainScore = chainCountScore + volumeScore;
      crossChainDescription = `Active on ${stats.overall.activeChainsCount} chains with ${stats.overall.totalTxCount} total transactions`;
    }

    factors.push({
      name: "Cross-Chain Reputation",
      weight: 50,
      score: crossChainScore,
      maxScore: 50,
      description: crossChainDescription,
    });

    return factors;
  }

  private calculateTrustScore(factors: ScoreFactor[]): number {
    return factors.reduce((sum, factor) => sum + factor.score, 0);
  }

  private determineRiskTier(trustScore: number): RiskTier {
    if (trustScore >= RISK_TIERS.low.min) return "low";
    if (trustScore >= RISK_TIERS.medium.min) return "medium";
    return "high";
  }

  private generateReasons(factors: ScoreFactor[], trustScore: number): EligibilityReason[] {
    const reasons: EligibilityReason[] = [];

    for (const factor of factors) {
      const percentage = factor.score / factor.maxScore;
      if (percentage >= 0.8) {
        reasons.push({
          type: "positive",
          message: `Strong ${factor.name}: ${factor.description}`,
          impact: factor.score,
        });
      } else if (percentage <= 0.4) {
        reasons.push({
          type: "negative",
          message: `Weak ${factor.name}: ${factor.description}`,
          impact: -factor.score,
        });
      }
    }

    return reasons;
  }

  private generateRecommendations(factors: ScoreFactor[], trustScore: number): string[] {
    const recommendations: string[] = [];

    for (const factor of factors) {
      const percentage = factor.score / factor.maxScore;
      if (percentage < 0.6) {
        switch (factor.name) {
          case "Identity Verified":
            recommendations.push("Complete HashKey KYC verification to secure your native identity and potentially earn up to 15 points");
            break;
          case "Native Activity":
            recommendations.push("Increase transaction frequency on HashKey Mainnet");
            break;
          case "Cross-Chain Reputation":
            recommendations.push("Link additional wallets (e.g., Solana) to boost your global reputation");
            break;
        }
      }
    }

    return recommendations;
  }

  private getMinScoreForProfile(profileType: ProfileType): number {
    switch (profileType) {
      case "creator":
        return ELIGIBILITY_THRESHOLDS.creatorAdvance.minTrustScore;
      case "merchant":
        return ELIGIBILITY_THRESHOLDS.merchantFinance.minTrustScore;
      case "defi":
        return ELIGIBILITY_THRESHOLDS.defiCredit.minTrustScore;
    }
  }

  private calculateCreatorLimit(
    trustScore: number,
    inputs: ScoringInputs,
    profileType: ProfileType
  ): number {
    if (profileType !== "creator" || trustScore < ELIGIBILITY_THRESHOLDS.creatorAdvance.minTrustScore) {
      return 0;
    }
    const monthlyInflow = inputs.monthlyInflow || 5000;
    const multiplier = this.getScoreMultiplier(trustScore);
    return Math.round(monthlyInflow * ELIGIBILITY_THRESHOLDS.creatorAdvance.maxAdvanceMultiplier * multiplier);
  }

  private calculateMerchantLimit(
    trustScore: number,
    inputs: ScoringInputs,
    profileType: ProfileType
  ): number {
    if (profileType !== "merchant" || trustScore < ELIGIBILITY_THRESHOLDS.merchantFinance.minTrustScore) {
      return 0;
    }
    const monthlySales = inputs.monthlySales || 10000;
    const multiplier = this.getScoreMultiplier(trustScore);
    return Math.round(monthlySales * ELIGIBILITY_THRESHOLDS.merchantFinance.maxCapitalMultiplier * multiplier);
  }

  private calculateDefiLimit(
    trustScore: number,
    inputs: ScoringInputs,
    profileType: ProfileType
  ): number {
    if (profileType !== "defi" || trustScore < ELIGIBILITY_THRESHOLDS.defiCredit.minTrustScore) {
      return 0;
    }
    const collateral = inputs.collateralValue || 50000;
    const multiplier = this.getScoreMultiplier(trustScore);
    return Math.round(collateral * ELIGIBILITY_THRESHOLDS.defiCredit.maxLTV * multiplier);
  }

  private getScoreMultiplier(trustScore: number): number {
    if (trustScore >= TRUST_BADGES.platinum.min) return TRUST_BADGES.platinum.multiplier;
    if (trustScore >= TRUST_BADGES.gold.min) return TRUST_BADGES.gold.multiplier;
    if (trustScore >= TRUST_BADGES.silver.min) return TRUST_BADGES.silver.multiplier;
    return TRUST_BADGES.bronze.multiplier;
  }

  getTrustBadge(trustScore: number) {
    if (trustScore >= TRUST_BADGES.platinum.min) {
      return { tier: "platinum" as const, score: trustScore, label: TRUST_BADGES.platinum.label };
    }
    if (trustScore >= TRUST_BADGES.gold.min) {
      return { tier: "gold" as const, score: trustScore, label: TRUST_BADGES.gold.label };
    }
    if (trustScore >= TRUST_BADGES.silver.min) {
      return { tier: "silver" as const, score: trustScore, label: TRUST_BADGES.silver.label };
    }
    return { tier: "bronze" as const, score: trustScore, label: TRUST_BADGES.bronze.label };
  }
}

export const eligibilityService = new EligibilityService();
