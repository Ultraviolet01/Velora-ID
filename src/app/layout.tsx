import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Web3Provider } from "@/components/providers/web3-provider";

export const dynamic = 'force-dynamic';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Velora ID | Private Financial Eligibility on HashKey Chain",
  description:
    "Nexa ID-powered private financial eligibility layer. Unlock creator advances, merchant PayFi financing, and DeFi credit access through verifiable trust signals.",
  keywords: [
    "HashKey Chain",
    "Nexa ID",
    "DeFi",
    "PayFi",
    "ZKID",
    "creator economy",
    "merchant financing",
    "blockchain",
    "privacy",
    "financial eligibility",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans min-h-screen bg-background text-foreground`}>
        <Web3Provider>
          <div className="relative min-h-screen">
            <div className="fixed inset-0 -z-10 bg-background">
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
              <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/10 rounded-full blur-[120px]" />
              <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
            </div>
            {children}
          </div>
          <Toaster />
        </Web3Provider>
      </body>
    </html>
  );
}
