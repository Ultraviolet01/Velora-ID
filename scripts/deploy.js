const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("Starting deployment to HashKey Testnet...");

  // 1. Deploy ProofVault
  const ProofVault = await hre.ethers.getContractFactory("ProofVault");
  const proofVault = await ProofVault.deploy();
  await proofVault.waitForDeployment();
  const proofVaultAddress = await proofVault.getAddress();
  console.log(`ProofVault deployed to: ${proofVaultAddress}`);

  // 2. Deploy VeloraRegistry
  const VeloraRegistry = await hre.ethers.getContractFactory("VeloraRegistry");
  const veloraRegistry = await VeloraRegistry.deploy(proofVaultAddress);
  await veloraRegistry.waitForDeployment();
  const veloraRegistryAddress = await veloraRegistry.getAddress();
  console.log(`VeloraRegistry deployed to: ${veloraRegistryAddress}`);

  // 3. Save addresses for the app to use
  const deploymentInfo = {
    network: "hashkeyTestnet",
    chainId: 133,
    proofVault: proofVaultAddress,
    veloraRegistry: veloraRegistryAddress,
    deployedAt: new Date().toISOString(),
  };

  const configPath = path.join(__dirname, "../src/config/deployed-contracts.json");
  
  // Ensure directory exists
  const configDir = path.dirname(configPath);
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
  }

  fs.writeFileSync(configPath, JSON.stringify(deploymentInfo, null, 2));
  console.log(`Deployment info saved to: ${configPath}`);

  // 4. Initial Setup: Set VeloraRegistry as a verifier in ProofVault
  console.log("Setting Registry as Verifier in ProofVault...");
  const tx = await proofVault.setVerifier(veloraRegistryAddress, true);
  await tx.wait();
  console.log("Setup complete!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
