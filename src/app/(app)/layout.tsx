"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { 
  LayoutDashboard, 
  UserCircle, 
  ShieldCheck, 
  TrendingUp, 
  Building,
  ArrowRight,
  LogOut,
  Sparkles,
  ChevronRight,
  Database,
  Lock,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { WalletConnect } from "@/components/web3/wallet-connect";
import { AppBackground } from "@/components/ui/app-background";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Vault", href: "/vault", icon: ShieldCheck },
    { name: "DeFi Access", href: "/defi", icon: TrendingUp },
    { name: "Merchant PayFi", href: "/merchant", icon: Building },
    { name: "Profile", href: "/profile", icon: UserCircle },
  ];

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#020617] text-[#F0F4FF] selection:bg-[#06D6C0]/30 selection:text-[#06D6C0] font-sans">
      <AppBackground variant="app" />
      
      {/* Top Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 h-24 border-b border-white/5 bg-[#020617]/40 backdrop-blur-3xl z-50 flex items-center justify-between px-8">
        <div className="flex items-center gap-10">
          <Link href="/" className="group flex items-center gap-3">
            <div className="h-10 w-10 bg-gradient-to-br from-[#06D6C0] to-[#3B82F6] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(6,214,192,0.3)] group-hover:scale-110 transition-all">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-display font-black tracking-[0.2em] uppercase italic group-hover:tracking-[0.25em] transition-all">
              Velora <span className="text-[#06D6C0]">ID</span>
            </span>
          </Link>
          
          <div className="hidden lg:flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10">
            <div className="h-1.5 w-1.5 rounded-full bg-[#06D6C0] animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-[rgba(200,210,240,0.6)]">Connected: HashKey Testnet</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <WalletConnect />
          <Button variant="ghost" size="icon" className="lg:hidden text-[rgba(200,210,240,0.6)]" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </header>

      <div className="flex pt-24 h-screen">
        {/* Sidebar */}
        <aside className={cn(
          "w-80 border-r border-white/5 bg-[#020617]/20 backdrop-blur-xl transition-all duration-500 overflow-y-auto z-40",
          !isSidebarOpen && "-ml-80 lg:ml-0"
        )}>
          <div className="p-8 space-y-10">
            <div className="space-y-4">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[rgba(160,175,210,0.4)] px-4">Menu</p>
              <nav className="space-y-2">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "group flex items-center justify-between px-4 py-4 rounded-2xl transition-all duration-300",
                        isActive 
                          ? "bg-white/5 text-[#06D6C0] border border-white/5 shadow-inner" 
                          : "text-[rgba(200,210,240,0.5)] hover:text-[#F0F4FF] hover:bg-white/[0.03]"
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <item.icon className={cn("h-5 w-5 transition-transform group-hover:scale-110", isActive && "text-[#06D6C0]")} />
                        <span className="font-display font-bold text-sm uppercase tracking-widest">{item.name}</span>
                      </div>
                      {isActive && <div className="h-1.5 w-1.5 rounded-full bg-[#06D6C0] shadow-[0_0_10px_#06D6C0]" />}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="space-y-6 pt-10">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[rgba(160,175,210,0.4)] px-4">Infrastructure</p>
              <div className="px-4 space-y-5">
                <div className="flex items-center gap-3 text-xs text-[rgba(200,210,240,0.4)]">
                  <Database className="h-4 w-4" />
                  <span>Prisma Engine: Standard</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-[rgba(200,210,240,0.4)]">
                  <Lock className="h-4 w-4" />
                  <span>Auth: Institutional</span>
                </div>
              </div>
            </div>

            <div className="pt-20">
              <Button variant="ghost" className="w-full justify-start gap-4 text-rose-500/60 hover:text-rose-500 hover:bg-rose-500/5 rounded-2xl px-4 py-6">
                <LogOut className="h-5 w-5" />
                <span className="font-display font-bold text-sm uppercase tracking-widest">Sign Out</span>
              </Button>
            </div>
          </div>
        </aside>

        {/* Main Content Areas */}
        <main className="flex-1 overflow-y-auto p-8 lg:p-12">
          <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
