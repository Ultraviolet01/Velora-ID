-- Velora ID Initial Database Setup
-- Run this in your Supabase SQL Editor to initialize the database tables.

-- 1. Create User table
CREATE TABLE IF NOT EXISTS "User" (
    "id" TEXT NOT NULL,
    "displayName" TEXT,
    "evmAddress" TEXT NOT NULL,
    "solanaAddress" TEXT,
    "trustScore" INTEGER NOT NULL DEFAULT 0,
    "riskTier" TEXT NOT NULL DEFAULT 'high',
    "onboardingStep" INTEGER NOT NULL DEFAULT 1,
    "evmVerified" BOOLEAN NOT NULL DEFAULT false,
    "solanaVerified" BOOLEAN NOT NULL DEFAULT false,
    "nexaIdVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- 2. Create ReputationHistory table
CREATE TABLE IF NOT EXISTS "ReputationHistory" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "trustScore" INTEGER NOT NULL,
    "riskTier" TEXT NOT NULL,
    "snapshot" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReputationHistory_pkey" PRIMARY KEY ("id")
);

-- 3. Add Uniqueness and Indexes
CREATE UNIQUE INDEX IF NOT EXISTS "User_evmAddress_key" ON "User"("evmAddress");
CREATE UNIQUE INDEX IF NOT EXISTS "User_solanaAddress_key" ON "User"("solanaAddress");
CREATE INDEX IF NOT EXISTS "ReputationHistory_userId_idx" ON "ReputationHistory"("userId");

-- 4. Add Foreign Key
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'ReputationHistory_userId_fkey') THEN
        ALTER TABLE "ReputationHistory" 
        ADD CONSTRAINT "ReputationHistory_userId_fkey" 
        FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
    END IF;
END $$;
