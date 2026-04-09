// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./ProofVault.sol";

/**
 * @title VeloraRegistry
 * @dev On-chain reputation registry for Velora ID trust scores and risk tiers.
 */
contract VeloraRegistry {
    address public owner;
    ProofVault public proofVault;
    
    enum RiskTier { LOW, MEDIUM, HIGH }

    struct UserReputation {
        uint256 trustScore;
        RiskTier riskTier;
        uint256 lastUpdated;
        bool isActive;
    }

    mapping(address => UserReputation) public registry;
    mapping(address => bool) public authorizedEngines;

    event ReputationUpdated(address indexed user, uint256 score, RiskTier tier);
    event EngineStatusUpdated(address engine, bool status);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }

    modifier onlyAuthorized() {
        require(msg.sender == owner || authorizedEngines[msg.sender], "Not authorized engine");
        _;
    }

    constructor(address _proofVault) {
        owner = msg.sender;
        proofVault = ProofVault(_proofVault);
    }

    function setEngineStatus(address _engine, bool _status) external onlyOwner {
        authorizedEngines[_engine] = _status;
        emit EngineStatusUpdated(_engine, _status);
    }

    /**
     * @dev Update a user's reputation score on-chain.
     */
    function updateReputation(
        address _user, 
        uint256 _trustScore, 
        RiskTier _tier
    ) external onlyAuthorized {
        require(_trustScore <= 100, "Score out of bounds");
        
        registry[_user] = UserReputation({
            trustScore: _trustScore,
            riskTier: _tier,
            lastUpdated: block.timestamp,
            isActive: true
        });

        emit ReputationUpdated(_user, _trustScore, _tier);
    }

    /**
     * @dev Get a user's reputation details.
     */
    function getReputation(address _user) 
        external 
        view 
        returns (uint256 trustScore, RiskTier riskTier, uint256 lastUpdated) 
    {
        UserReputation storage rep = registry[_user];
        require(rep.isActive, "User not in registry");
        return (rep.trustScore, rep.riskTier, rep.lastUpdated);
    }
}
