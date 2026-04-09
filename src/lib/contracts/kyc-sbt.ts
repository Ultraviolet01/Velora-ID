export const KYC_SBT_ADDRESS = "0x890C366710714E297A9B935ffCDBb24e7059B43A";

export const KYC_SBT_ABI = [
  {
    "inputs": [{ "internalType": "address", "name": "account", "type": "address" }],
    "name": "isHuman",
    "outputs": [
      { "internalType": "bool", "name": "isHuman", "type": "bool" },
      { "internalType": "uint8", "name": "level", "type": "uint8" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "account", "type": "address" }],
    "name": "getKycInfo",
    "outputs": [
      { "internalType": "string", "name": "ensName", "type": "string" },
      { "internalType": "uint8", "name": "level", "type": "uint8" },
      { "internalType": "uint8", "name": "status", "type": "uint8" },
      { "internalType": "uint256", "name": "createTime", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

export enum KycLevel {
  NONE = 0,
  BASIC = 1,
  ADVANCED = 2,
  PREMIUM = 3,
  ULTIMATE = 4
}

export enum KycStatus {
  NONE = 0,
  APPROVED = 1,
  REVOKED = 2
}
