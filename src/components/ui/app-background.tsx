"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface AppBackgroundProps {
  variant?: "landing" | "app";
  className?: string;
}

export const AppBackground = ({ variant = "landing", className }: AppBackgroundProps) => {
  return (
    <div className={cn("fixed inset-0 -z-10 overflow-hidden", className)}>
      <div className="absolute inset-0 bg-[#020617]" />
      
      {variant === "landing" ? (
        <>
          {/* Landing Specific Background */}
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,#06D6C008_0%,transparent_50%)]" />
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,#3B82F608_0%,transparent_50%)]" />
          <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_40%_80%,#6366F105_0%,transparent_50%)]" />
          
          {/* Subtle Noise / Grain */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <filter id="noise">
                <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
              </filter>
              <rect width="100%" height="100%" filter="url(#noise)" />
            </svg>
          </div>
          
          {/* Grid Lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        </>
      ) : (
        <>
          {/* App Specific Background */}
          <div className="absolute top-0 left-[20%] w-[800px] h-[800px] bg-[#06D6C0]/5 blur-[120px] rounded-full mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-[#3B82F6]/5 blur-[100px] rounded-full mix-blend-screen animate-pulse" style={{ animationDuration: '12s' }} />
          
          {/* Subtle Grid for App */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:80px_80px]" />
        </>
      )}
    </div>
  );
};
