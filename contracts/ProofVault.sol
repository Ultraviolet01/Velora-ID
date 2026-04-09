// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title ProofVault
 * @dev Stores reputation proof hashes for Velora ID on HashKey Chain.
 */
contract ProofVault {
    address public owner;
    
    struct Proof {
        bytes32 proofHash;
        string proofType;
        uint256 timestamp;
        bool verified;
    }
    
    // Mapping from User Address => Mapping from Proof Type => Proof Record
    mapping(address => mapping(string => Proof)) public userProofs;
    mapping(address => bool) public verifiers;

    event ProofAdded(address indexed user, string proofType, bytes32 proofHash);
    event VerifierUpdated(address verifier, bool status);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }

    modifier onlyVerifier() {
        require(msg.sender == owner || verifiers[msg.sender], "Not authorized verifier");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function setVerifier(address _verifier, bool _status) external onlyOwner {
        verifiers[_verifier] = _status;
        emit VerifierUpdated(_verifier, _status);
    }

    /**
     * @dev Add a new proof to the vault.
     */
    function addProof(
        address _user,
        string calldata _proofType,
        bytes32 _proofHash
    ) external onlyVerifier {
        userProofs[_user][_proofType] = Proof({
            proofHash: _proofHash,
            proofType: _proofType,
            timestamp: block.timestamp,
            verified: true
        });
        
        emit ProofAdded(_user, _proofType, _proofHash);
    }

    /**
     * @dev Get proof data for a user.
     */
    function getProof(address _user, string calldata _proofType) 
        external 
        view 
        returns (bytes32 hash, uint256 time, bool isVerified) 
    {
        Proof storage p = userProofs[_user][_proofType];
        return (p.proofHash, p.timestamp, p.verified);
    }
}
