import Link from "next/link";
import {
  Shield,
  ArrowLeft,
  Code,
  Layers,
  Zap,
  Lock,
  Brain,
  Users,
  Building,
  Coins,
  FileCheck,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar, Footer } from "@/components/layout";

const tracks = [
  {
    name: "ZKID",
    description: "Privacy-preserving identity verification through Nexa ID proofs",
    icon: Lock,
  },
  {
    name: "PayFi",
    description: "Merchant financing based on verified sales and settlement data",
    icon: Building,
  },
  {
    name: "DeFi",
    description: "Under-collateralized credit access powered by trust signals",
    icon: Coins,
  },
  {
    name: "AI",
    description: "AI-powered explanations for all eligibility decisions",
    icon: Brain,
  },
];

const features = [
  "Nexa ID-powered identity verification",
  "Privacy-preserving proof generation",
  "Transparent weighted scoring system",
  "AI-explained eligibility decisions",
  "Creator advance financing",
  "Merchant PayFi working capital",
  "DeFi credit access",
  "Verifier/Lender dashboard",
  "On-chain proof registration",
  "HashKey Chain integration",
];

const techStack = [
  { name: "Next.js 14", description: "React framework with App Router" },
  { name: "TypeScript", description: "Type-safe development" },
  { name: "Tailwind CSS", description: "Utility-first styling" },
  { name: "Radix UI", description: "Accessible component primitives" },
  { name: "Framer Motion", description: "Smooth animations" },
  { name: "HashKey Chain", description: "Enterprise blockchain infrastructure" },
];

export default function DocsPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <Badge variant="default" className="mb-4">
              Documentation
            </Badge>
            <h1 className="text-4xl font-bold mb-4">Velora ID Documentation</h1>
            <p className="text-muted-foreground">
              Technical documentation, architecture overview, and submission materials
              for the HashKey Chain Horizon Hackathon.
            </p>
          </div>

          {/* Hackathon Tracks */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Hackathon Tracks</h2>
            <div className="grid md:grid-cols-4 gap-4">
              {tracks.map((track) => (
                <Card key={track.name} variant="glass">
                  <CardContent className="pt-6">
                    <track.icon className="h-8 w-8 text-primary mb-4" />
                    <h3 className="font-semibold mb-2">{track.name}</h3>
                    <p className="text-sm text-muted-foreground">{track.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* What is Velora ID */}
          <section className="mb-16">
            <Card variant="gradient" className="p-8">
              <h2 className="text-2xl font-bold mb-4">What is Velora ID?</h2>
              <p className="text-muted-foreground mb-6">
                Velora ID is a <strong>Nexa ID-powered private financial eligibility layer</strong> on
                HashKey Chain that helps creators, merchants, and DeFi users unlock funding and credit
                access through verifiable trust signals, privacy-preserving proof flows, and AI-powered
                financial explanations.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <Users className="h-6 w-6 text-purple-500 mb-2" />
                  <h3 className="font-semibold mb-1">For Creators</h3>
                  <p className="text-sm text-muted-foreground">
                    Unlock cash advances based on verified creator income without credit checks.
                  </p>
                </div>
                <div>
                  <Building className="h-6 w-6 text-blue-500 mb-2" />
                  <h3 className="font-semibold mb-1">For Merchants</h3>
                  <p className="text-sm text-muted-foreground">
                    Access working capital financing based on verified sales history.
                  </p>
                </div>
                <div>
                  <Coins className="h-6 w-6 text-green-500 mb-2" />
                  <h3 className="font-semibold mb-1">For DeFi Users</h3>
                  <p className="text-sm text-muted-foreground">
                    Unlock better borrowing terms through verified trust signals.
                  </p>
                </div>
              </div>
            </Card>
          </section>

          {/* Architecture */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Architecture Overview</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card variant="glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Layers className="h-5 w-5 text-primary" />
                    Frontend Architecture
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="p-3 rounded bg-background/50">
                    <p className="font-medium">App Router (Next.js 14)</p>
                    <p className="text-muted-foreground">
                      Marketing pages, app dashboard, onboarding flow
                    </p>
                  </div>
                  <div className="p-3 rounded bg-background/50">
                    <p className="font-medium">UI Component Library</p>
                    <p className="text-muted-foreground">
                      Radix UI primitives + custom Tailwind components
                    </p>
                  </div>
                  <div className="p-3 rounded bg-background/50">
                    <p className="font-medium">State Management</p>
                    <p className="text-muted-foreground">
                      React hooks + service abstraction layer
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card variant="glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5 text-primary" />
                    Service Layer
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="p-3 rounded bg-background/50">
                    <p className="font-medium">Nexa ID Service</p>
                    <p className="text-muted-foreground">
                      Proof generation, verification, vault management
                    </p>
                  </div>
                  <div className="p-3 rounded bg-background/50">
                    <p className="font-medium">Eligibility Engine</p>
                    <p className="text-muted-foreground">
                      Weighted scoring, product limits, risk tiers
                    </p>
                  </div>
                  <div className="p-3 rounded bg-background/50">
                    <p className="font-medium">AI Explanation</p>
                    <p className="text-muted-foreground">
                      Human-readable decision explanations
                    </p>
                  </div>
                  <div className="p-3 rounded bg-background/50">
                    <p className="font-medium">Chain Integration</p>
                    <p className="text-muted-foreground">
                      HashKey Chain wallet, proofs, transactions
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Features */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Features</h2>
            <Card variant="glass">
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-4">
                  {features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <FileCheck className="h-4 w-4 text-green-500 shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Tech Stack */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Tech Stack</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {techStack.map((tech) => (
                <Card key={tech.name} variant="glass">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-1">{tech.name}</h3>
                    <p className="text-sm text-muted-foreground">{tech.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Setup Instructions */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Setup Instructions</h2>
            <Card variant="glass">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <p className="font-mono text-sm bg-background/50 p-4 rounded">
                      # Clone the repository
                      <br />
                      git clone https://github.com/velora/velora-id
                      <br />
                      <br />
                      # Install dependencies
                      <br />
                      npm install
                      <br />
                      <br />
                      # Copy environment variables
                      <br />
                      cp .env.example .env.local
                      <br />
                      <br />
                      # Run development server
                      <br />
                      npm run dev
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Privacy & Compliance */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Privacy & Compliance</h2>
            <Card variant="glass">
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <Lock className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Zero-Knowledge Proofs</p>
                    <p className="text-sm text-muted-foreground">
                      All identity and financial proofs use privacy-preserving ZK techniques.
                      Raw data never leaves the user's device or touches the blockchain.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">User-Controlled Data</p>
                    <p className="text-sm text-muted-foreground">
                      Users own their proofs and choose what to share with verifiers.
                      No centralized data storage or third-party access.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FileCheck className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">On-Chain Verification</p>
                    <p className="text-sm text-muted-foreground">
                      Proof hashes are registered on HashKey Chain for transparent,
                      auditable verification without exposing underlying data.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Roadmap */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Future Roadmap</h2>
            <Card variant="glass">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {[
                    "Real LLM integration for AI explanations",
                    "Production smart contract deployment",
                    "Multi-chain expansion beyond HashKey Chain",
                    "Additional proof types and verification methods",
                    "Mobile app for proof generation",
                    "Integration with more DeFi protocols",
                    "Regulatory compliance features for institutional use",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-primary" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* CTA */}
          <div className="text-center">
            <Link href="/onboarding">
              <Button variant="gradient" size="xl">
                Try the Demo
                <ChevronRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
