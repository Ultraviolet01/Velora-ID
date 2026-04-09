const { createPublicClient, http } = require('viem');

const KYC_SBT_ADDRESS = "0x3AfBFC76f49A4D466D03775B371a4F6142c6A194";
const RPC_URL = "https://hk-testnet.rpc.alt.technology";

const KYC_SBT_ABI = [
  {
    "inputs": [{ "internalType": "address", "name": "account", "type": "address" }],
    "name": "isHuman",
    "outputs": [
      { "internalType": "bool", "name": "isHuman", "type": "bool" },
      { "internalType": "uint8", "name": "level", "type": "uint8" }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

async function testKyc() {
  console.log("Testing HashKey KYC Contract Connectivity...");
  console.log("RPC:", RPC_URL);
  console.log("Contract:", KYC_SBT_ADDRESS);

  const client = createPublicClient({
    transport: http(RPC_URL),
  });

  const testAddress = "0x0000000000000000000000000000000000000000";

  try {
    const [isHuman, level] = await client.readContract({
      address: KYC_SBT_ADDRESS,
      abi: KYC_SBT_ABI,
      functionName: 'isHuman',
      args: [testAddress],
    });

    console.log("Success! Connectivity established.");
    console.log(`Address ${testAddress} status:`);
    console.log(`- Is Human: ${isHuman}`);
    console.log(`- KYC Level: ${level}`);
  } catch (error) {
    console.error("Failed to connect to KYC contract:", error.message);
  }
}

testKyc();
