// AI Explanation Service - Generates human-readable financial reasoning
import {
  AIExplanation,
  EligibilityResult,
  ProfileType,
  ScoreFactor,
  CreatorAdvanceOffer,
  MerchantFinanceOffer,
  DefiCreditOffer,
} from "@/types";
import { formatCurrency } from "@/lib/utils";

class AIExplanationService {
  generateExplanation(
    eligibility: EligibilityResult,
    profileType: ProfileType
  ): AIExplanation {
    const summary = this.generateSummary(eligibility, profileType);
    const positiveFactors = this.extractPositiveFactors(eligibility.factors);
    const negativeFactors = this.extractNegativeFactors(eligibility.factors);
    const recommendations = this.generateDetailedRecommendations(eligibility, profileType);
    const detailedAnalysis = this.generateDetailedAnalysis(eligibility, profileType);

    return {
      summary,
      positiveFactors,
      negativeFactors,
      recommendations,
      detailedAnalysis,
    };
  }

  private generateSummary(eligibility: EligibilityResult, profileType: ProfileType): string {
    const { eligible, trustScore, riskTier } = eligibility;
    const productName = this.getProductName(profileType);

    if (eligible) {
      if (trustScore >= 80) {
        return `You're highly eligible for ${productName} with a strong trust score of ${trustScore}. Your verified identity, consistent activity, and stable income patterns demonstrate excellent financial reliability.`;
      } else if (trustScore >= 65) {
        return `You're eligible for ${productName} with a trust score of ${trustScore}. Your profile shows solid fundamentals with some room for improvement in building longer-term history.`;
      } else {
        return `You're eligible for ${productName} with a trust score of ${trustScore}. While you meet the minimum requirements, building stronger verification signals will unlock better terms.`;
      }
    } else {
      return `Not yet eligible for ${productName}. Your current trust score is ${trustScore}, but you need ${this.getMinScore(profileType)} to qualify. Focus on the recommendations below to improve your score.`;
    }
  }

  private extractPositiveFactors(factors: ScoreFactor[]): string[] {
    return factors
      .filter((f) => f.score / f.maxScore >= 0.7)
      .map((f) => {
        const percentage = Math.round((f.score / f.maxScore) * 100);
        return `${f.name} (${percentage}%): ${f.description}`;
      });
  }

  private extractNegativeFactors(factors: ScoreFactor[]): string[] {
    return factors
      .filter((f) => f.score / f.maxScore < 0.5)
      .map((f) => {
        const percentage = Math.round((f.score / f.maxScore) * 100);
        return `${f.name} (${percentage}%): ${f.description}`;
      });
  }

  private generateDetailedRecommendations(
    eligibility: EligibilityResult,
    profileType: ProfileType
  ): string[] {
    const recs: string[] = [];
    const { factors, trustScore } = eligibility;

    // Find weakest factors
    const sortedFactors = [...factors].sort(
      (a, b) => a.score / a.maxScore - b.score / b.maxScore
    );

    for (const factor of sortedFactors.slice(0, 3)) {
      const percentage = factor.score / factor.maxScore;
      if (percentage < 0.7) {
        recs.push(this.getFactorRecommendation(factor, profileType));
      }
    }

    // Add score-specific recommendations
    if (trustScore < 60) {
      recs.push("Complete Nexa ID verification for an immediate 25-point boost");
    }
    if (trustScore >= 60 && trustScore < 75) {
      recs.push("Maintain activity for 2-3 more months to reach Gold Trust status");
    }

    return recs;
  }

  private getFactorRecommendation(factor: ScoreFactor, profileType: ProfileType): string {
    const recommendations: Record<string, string> = {
      "Nexa ID Verification":
        "Complete Nexa ID verification to prove your identity privately. This is the single biggest impact to your score.",
      "Wallet History":
        "Continue using this wallet consistently. Each month of activity adds to your credibility.",
      "Activity Consistency":
        "Make regular on-chain transactions to demonstrate consistent usage patterns.",
      "Income Stability":
        "Establish regular income deposits to show stable cash flow patterns.",
      "Profile Completeness":
        "Fill in all profile fields to give verifiers a complete picture of your financial activity.",
      "Repayment History":
        "Start with smaller funding amounts to build a positive repayment track record.",
    };
    return recommendations[factor.name] || `Improve your ${factor.name.toLowerCase()}`;
  }

  private generateDetailedAnalysis(
    eligibility: EligibilityResult,
    profileType: ProfileType
  ): string {
    const { trustScore, riskTier, factors } = eligibility;
    const strongFactors = factors.filter((f) => f.score / f.maxScore >= 0.7);
    const weakFactors = factors.filter((f) => f.score / f.maxScore < 0.5);

    let analysis = `Trust Score Analysis: ${trustScore}/100 (${riskTier} risk)\n\n`;

    if (strongFactors.length > 0) {
      analysis += `Strengths:\n`;
      strongFactors.forEach((f) => {
        analysis += `• ${f.name}: Contributing ${f.score}/${f.maxScore} points\n`;
      });
      analysis += "\n";
    }

    if (weakFactors.length > 0) {
      analysis += `Areas for Improvement:\n`;
      weakFactors.forEach((f) => {
        analysis += `• ${f.name}: Only ${f.score}/${f.maxScore} points - ${f.description}\n`;
      });
    }

    return analysis;
  }

  // Institutional Risk Underwriting - Real AI Integration
  async generateInstitutionalRiskReport(
    applicantId: string,
    profileType: ProfileType,
    eligibility: EligibilityResult,
    requestedAmount: number
  ): Promise<AIExplanation> {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey || apiKey === "sk-your-openai-api-key-here" || apiKey.includes("your-openai-api-key")) {
      console.warn("OpenAI API key missing or invalid, using template fallback");
      return this.generateExplanation(eligibility, profileType);
    }

    try {
      const prompt = `
        You are an Institutional Risk Underwriting Agent for Velora ID. 
        Your task is to analyze a funding application and provide a professional credit risk assessment.
        
        APPLICANT CONTEXT:
        - Profile Type: ${profileType}
        - Requested Amount: ${formatCurrency(requestedAmount)}
        - Trust Score: ${eligibility.trustScore}/100
        - Risk Tier: ${eligibility.riskTier}
        
        SCORING FACTORS:
        ${eligibility.factors.map(f => `- ${f.name}: ${f.score}/${f.maxScore} (${f.description})`).join('\n')}
        
        Please provide your assessment in the following JSON format:
        {
          "summary": "Professional executive summary of the credit risk (2-3 sentences)",
          "positiveFactors": ["List of 3 key strengths of this application"],
          "negativeFactors": ["List of potential risks or areas of concern"],
          "recommendations": ["Actionable recommendation for the verifier (Approve, Reject, or specific conditions)"],
          "detailedAnalysis": "A deeper look at why the trust score and risk tier were assigned based on the multi-chain signals provided."
        }
      `;

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo-0125", // Using 3.5 for speed/cost in demo
          messages: [
            { role: "system", content: "You are a professional financial risk underwriter." },
            { role: "user", content: prompt }
          ],
          response_format: { type: "json_object" }
        })
      });

      if (!response.ok) throw new Error(`OpenAI API responded with ${response.status}`);
      
      const data = await response.json();
      return JSON.parse(data.choices[0].message.content) as AIExplanation;
    } catch (error) {
      console.error("AI Generation Error:", error);
      // Fallback to static generation if AI fails
      return this.generateExplanation(eligibility, profileType);
    }
  }

  private getProductName(profileType: ProfileType): string {
    switch (profileType) {
      case "creator": return "Creator Advance";
      case "merchant": return "Merchant PayFi";
      case "defi": return "DeFi Credit";
      default: return "funding";
    }
  }

  private getMinScore(profileType: ProfileType): number {
    switch (profileType) {
      case "creator": return 40;
      case "merchant": return 50;
      case "defi": return 45;
      default: return 50;
    }
  }
}

export const aiExplanationService = new AIExplanationService();
