import Link from "next/link";
import {
  Shield,
  Wallet,
  TrendingUp,
  Users,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Lock,
  Zap,
  Brain,
  Building,
  Coins,
  ChevronRight,
} from "lucide-react";
import { Navbar, Footer, HeroSection } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const useCases = [
  {
    icon: Users,
    title: "Creator Advances",
    description:
      "Unlock cash advances based on your verified creator income. No credit checks, no personal data exposure.",
    features: ["Income-based eligibility", "Flexible repayment", "Instant access"],
    badge: "For Creators",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Building,
    title: "Merchant PayFi",
    description:
      "Access working capital financing based on your verified sales history. Privacy-preserved business proofs.",
    features: ["Sales-based limits", "Weekly settlements", "Business growth"],
    badge: "For Merchants",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Coins,
    title: "DeFi Credit Access",
    description:
      "Unlock better DeFi borrowing terms through verified trust signals. No over-collateralization needed.",
    features: ["Trust-based lending", "Lower collateral", "Premium pools"],
    badge: "For DeFi Users",
    color: "from-green-500 to-emerald-500",
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Connect Wallet",
    description: "Link your wallet to begin the verification process securely on HashKey Chain.",
  },
  {
    step: "02",
    title: "Generate Proofs",
    description: "Nexa ID generates privacy-preserving proofs of your financial activity and identity.",
  },
  {
    step: "03",
    title: "Get Scored",
    description: "Our transparent scoring engine calculates your trust score and eligibility.",
  },
  {
    step: "04",
    title: "Unlock Access",
    description: "Access creator advances, merchant financing, or DeFi credit based on your score.",
  },
];

const whyHashKey = [
  {
    icon: Shield,
    title: "Enterprise-Grade Security",
    description: "HashKey Chain provides institutional-level security for financial applications.",
  },
  {
    icon: Zap,
    title: "High Performance",
    description: "Fast finality and low transaction costs enable real-time proof verification.",
  },
  {
    icon: Lock,
    title: "Privacy-First Design",
    description: "Built for privacy-preserving identity and financial data management.",
  },
];

const whyVelora = [
  {
    title: "No Credit Checks",
    description: "We use on-chain activity and verified proofs, not traditional credit scores.",
  },
  {
    title: "Privacy Preserved",
    description: "Share only what's needed through zero-knowledge proofs and attestations.",
  },
  {
    title: "AI-Powered Insights",
    description: "Get clear, human-readable explanations for every eligibility decision.",
  },
  {
    title: "Instant Decisions",
    description: "Real-time eligibility assessment powered by on-chain verification.",
  },
];

const faqs = [
  {
    question: "What is Velora ID?",
    answer:
      "Velora ID is a private financial eligibility layer built on HashKey Chain. It uses Nexa ID for privacy-preserving identity verification and helps creators, merchants, and DeFi users prove their eligibility for funding without exposing sensitive personal data.",
  },
  {
    question: "How does the trust score work?",
    answer:
      "The trust score is calculated using a transparent weighted system that considers factors like Nexa ID verification, wallet history, activity consistency, income stability, and repayment history. Each factor contributes to your overall score out of 100.",
  },
  {
    question: "What data do I need to share?",
    answer:
      "You only share privacy-preserving proofs, not raw data. Nexa ID generates zero-knowledge proofs that verify claims (like 'monthly income > $5000') without revealing the actual numbers or personal information.",
  },
  {
    question: "Which hackathon tracks does this cover?",
    answer:
      "Velora ID covers multiple HashKey Chain Horizon Hackathon tracks: ZKID (privacy-preserving identity), PayFi (merchant financing), DeFi (credit access), and AI (explanation layer).",
  },
  {
    question: "Is my data stored on-chain?",
    answer:
      "Only proof hashes and attestations are stored on-chain. Your actual personal and financial data never touches the blockchain. Proofs are generated locally and verified cryptographically.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main>
        {/* Hero */}
        <HeroSection />

        {/* Use Cases */}
        <section id="use-cases" className="py-24 relative">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <Badge variant="default" className="mb-4">
                Use Cases
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Unlock Funding Across Three Verticals
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                One trust profile, multiple financing options. Prove your eligibility once,
                access capital everywhere.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {useCases.map((useCase, i) => (
                <Card key={i} variant="glass" className="relative overflow-hidden group">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${useCase.color} opacity-0 group-hover:opacity-5 transition-opacity`}
                  />
                  <CardHeader>
                    <Badge variant="outline" className="w-fit mb-4">
                      {useCase.badge}
                    </Badge>
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <useCase.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{useCase.title}</CardTitle>
                    <CardDescription>{useCase.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {useCase.features.map((feature, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-24 bg-card/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <Badge variant="default" className="mb-4">
                How It Works
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Four Steps to Financial Eligibility
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                From wallet connection to unlocking capital in minutes.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {howItWorks.map((step, i) => (
                <div key={i} className="relative">
                  {i < howItWorks.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-primary/50 to-transparent -translate-x-4" />
                  )}
                  <div className="text-center">
                    <div className="text-5xl font-bold text-primary/20 mb-4">{step.step}</div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why HashKey Chain */}
        <section id="features" className="py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <Badge variant="default" className="mb-4">
                  Built on HashKey Chain
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Why HashKey Chain?
                </h2>
                <p className="text-muted-foreground mb-8">
                  HashKey Chain provides the ideal infrastructure for privacy-preserving
                  financial applications with its enterprise-grade security and
                  performance.
                </p>

                <div className="space-y-6">
                  {whyHashKey.map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <item.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Card variant="gradient" className="p-8">
                <h3 className="text-xl font-semibold mb-6">Why Velora ID?</h3>
                <div className="grid grid-cols-2 gap-6">
                  {whyVelora.map((item, i) => (
                    <div key={i}>
                      <h4 className="font-medium mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* AI Underwriting */}
        <section className="py-24 bg-card/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <Card variant="glass" className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Brain className="h-5 w-5 text-primary" />
                    <span className="font-semibold">AI Insights</span>
                  </div>
                  <div className="space-y-4 text-sm">
                    <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                      <p className="font-medium text-green-400 mb-2">Eligibility Approved</p>
                      <p className="text-muted-foreground">
                        "Eligible because identity is verified, activity is consistent over 11
                        months, and income stability shows only 15% variance."
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-background/50">
                      <p className="font-medium mb-2">Score Factors</p>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>✓ Nexa ID verification complete (+25 pts)</li>
                        <li>✓ Wallet age over 180 days (+12 pts)</li>
                        <li>✓ Consistent monthly activity (+18 pts)</li>
                      </ul>
                    </div>
                    <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                      <p className="font-medium text-primary mb-2">Recommendations</p>
                      <p className="text-muted-foreground">
                        "Maintain activity for 2 more months to reach Gold Trust status and
                        unlock 25% higher limits."
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="order-1 lg:order-2">
                <Badge variant="default" className="mb-4">
                  AI-Powered
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Underwriting Explained in Plain English
                </h2>
                <p className="text-muted-foreground mb-6">
                  Our AI explanation layer translates complex scoring decisions into
                  clear, actionable insights. Understand exactly why you're approved,
                  denied, or what you can do to improve.
                </p>
                <ul className="space-y-3">
                  {[
                    "Clear eligibility explanations",
                    "Factor-by-factor score breakdown",
                    "Personalized improvement recommendations",
                    "Risk tier explanations",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <Badge variant="default" className="mb-4">
                  FAQ
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Frequently Asked Questions
                </h2>
              </div>

              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`item-${i}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10" />
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Unlock Your Financial Eligibility?
              </h2>
              <p className="text-muted-foreground mb-8">
                Connect your wallet, generate privacy-preserving proofs, and discover
                what funding options you qualify for.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/onboarding">
                  <Button variant="gradient" size="xl" className="gap-2">
                    <Wallet className="h-5 w-5" />
                    Start Now
                  </Button>
                </Link>
                <Link href="/docs">
                  <Button variant="outline" size="xl" className="gap-2">
                    Read Documentation
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
