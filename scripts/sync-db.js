require('dotenv').config();
const { execSync } = require('child_process');

console.log("🚀 Starting Final Backend Sync...");

try {
  // 1. Generate the Client with explicit env loading
  console.log("📡 Generating Prisma Client...");
  execSync('node node_modules/prisma/build/index.js generate', { 
    stdio: 'inherit',
    env: { ...process.env, DATABASE_URL: process.env.DATABASE_URL }
  });
  
  console.log("✅ Backend fully synchronized and ready!");
} catch (error) {
  console.error("❌ Sync failed.");
  process.exit(1);
}
