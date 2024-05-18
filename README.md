
# zkSync NFT Deployment Guide

## Introduction

This repository contains a step-by-step guide to deploying a Non-Fungible Token (NFT) on zkSync, a Layer 2 scaling solution for Ethereum. zkSync provides scalability and lower transaction costs while maintaining the security of the Ethereum mainnet.


## Prerequisites

- Node.js (v14 or later)
- MetaMask
- Hardhat
- zkSync plugin for Hardhat

## Setup Instructions

### Step 1: Initialize the Project

1. **Create a new directory for your project:**

   ```bash
   mkdir zknft
   cd zknft
   ```

2. **Initialize a new Node.js project:**

   ```bash
   npm init -y
   ```

3. **Install Hardhat and zkSync plugin:**

   ```bash
   npm install --save-dev hardhat @matterlabs/hardhat-zksync
   ```

4. **Create a Hardhat project:**

   ```bash
   npx hardhat
   ```

   Choose "Create a basic sample project" and follow the prompts.

### Step 2: Configure Hardhat for zkSync

Modify the `hardhat.config.js` file to include zkSync configuration:

```javascript
require("@matterlabs/hardhat-zksync");

module.exports = {
  solidity: "0.8.18",
  zksync: {
    url: "https://rpc.zksync.io",
    ethNetwork: "mainnet",
    zksync: true,
  },
};
```

### Step 3: Create the NFT Smart Contract

Create a new Solidity file `MyNFT.sol` inside the `contracts` directory:

```solidity
// contracts/MyNFT.sol

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyNFT is ERC721, Ownable {
    uint256 public tokenCounter;

    constructor() ERC721("MyNFT", "MNFT") {
        tokenCounter = 0;
    }

    function createNFT(address recipient) public onlyOwner returns (uint256) {
        _safeMint(recipient, tokenCounter);
        tokenCounter += 1;
        return tokenCounter;
    }
}
```

### Step 4: Write the Deployment Script

Create a new file `deploy.js` inside the `scripts` directory:

```javascript
// scripts/deploy.js

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const MyNFT = await ethers.getContractFactory("MyNFT");
  const myNFT = await MyNFT.deploy();

  console.log("MyNFT deployed to:", myNFT.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

### Step 5: Write the Interaction Script

Create a new file `interact.js` inside the `scripts` directory:

```javascript
// scripts/interact.js

const { ethers } = require("hardhat");

async function main() {
    const provider = new ethers.providers.JsonRpcProvider("https://rpc.zksync.io");
    const wallet = new ethers.Wallet("YOUR_PRIVATE_KEY", provider);

    const contractAddress = "YOUR_CONTRACT_ADDRESS";
    const abi = [
        "function createNFT(address recipient) public returns (uint256)",
        "function tokenCounter() public view returns (uint256)"
    ];

    const contract = new ethers.Contract(contractAddress, abi, wallet);

    // Mint a new NFT
    const tx = await contract.createNFT(wallet.address);
    await tx.wait();

    // Get the total number of NFTs minted
    const totalMinted = await contract.tokenCounter();
    console.log("Total NFTs minted:", totalMinted.toString());
}

main();
```

### Step 6: Compile and Deploy the Contract

1. **Compile the smart contract:**

   ```bash
   npx hardhat compile
   ```

2. **Deploy the smart contract to zkSync:**

   ```bash
   npx hardhat run scripts/deploy.js --network zksync
   ```

   Make sure to replace `YOUR_PRIVATE_KEY` and `YOUR_CONTRACT_ADDRESS` with your actual private key and deployed contract address in the `interact.js` script.

### Step 7: Interact with the Deployed Contract

1. **Run the interaction script:**

   ```bash
   npx hardhat run scripts/interact.js --network zksync
   ```

   This will mint a new NFT to the address associated with your private key and display the total number of NFTs minted.

### Step 8: Add Documentation

Create a `README.md` file to document your project:

```markdown
# zkSync NFT Deployment Guide

## Introduction

This repository contains a step-by-step guide to deploying a Non-Fungible Token (NFT) on zkSync, a Layer 2 scaling solution for Ethereum.


## Setup Instructions

### Prerequisites

- Node.js
- MetaMask

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/zkSync-NFT.git
   cd zkSync-NFT
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure zkSync network in MetaMask:
   - Network Name: zkSync
   - New RPC URL: `https://rpc.zksync.io`
   - Chain ID: 280
   - Currency Symbol: ETH
   - Block Explorer URL: `https://zkscan.io`

### Compilation

```bash
npx hardhat compile
```

### Deployment

Replace `YOUR_PRIVATE_KEY` in `scripts/interact.js` with your MetaMask private key.

```bash
npx hardhat run scripts/deploy.js --network zksync
```

### Interaction

Replace `YOUR_CONTRACT_ADDRESS` in `scripts/interact.js` with the deployed contract address.

```bash
npx hardhat run scripts/interact.js --network zksync
```

## Conclusion

By following this guide, you can deploy and interact with an NFT smart contract on zkSync, taking advantage of its scalability and low transaction costs.

### Resources

- [zkSync Documentation](https://zksync.io/docs/)
- [zkSync GitHub](https://github.com/matter-labs/zksync)
- [zkSync Community](https://community.zksync.io/)

Happy building on zkSync!
```

---

This documentation provides a comprehensive guide for setting up, deploying, and interacting with an NFT smart contract on zkSync. It includes all the necessary steps, code snippets, and configuration details to help developers get started quickly and efficiently.