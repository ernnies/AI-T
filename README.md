# step-by-step guide to deploying a Non-Fungible Token (NFT) on zkSync Era using Hardhat. 

This guide assumes you have some basic knowledge of using Hardhat and Solidity.

### Step 1: Set Up Your Project

1. **Initialize your project:**
   ```bash
   mkdir zksync-nft
   cd zksync-nft
   npm init -y
   ```

2. **Install Hardhat and other dependencies:**
   ```bash
   npm install --save-dev hardhat
   npm install --save-dev @nomiclabs/hardhat-ethers ethers
   npm install --save-dev @matterlabs/hardhat-zksync-deploy @matterlabs/hardhat-zksync-solc
   npm install --save-dev dotenv
   ```

3. **Create a Hardhat project:**
   ```bash
   npx hardhat
   ```
Select "Create a basic sample project."

### Step 2: Configure Hardhat for zkSync

1. **`hardhat.config.ts`:**
   ```typescript
   import { HardhatUserConfig } from "hardhat/types";
   import "@nomiclabs/hardhat-ethers";
   import "@matterlabs/hardhat-zksync-deploy";
   import "@matterlabs/hardhat-zksync-solc";
   import * as dotenv from "dotenv";

   dotenv.config();

   const config: HardhatUserConfig = {
     defaultNetwork: "zkSyncTestnet",
     networks: {
       zkSyncTestnet: {
         url: "https://testnet.era.zksync.dev",
         ethNetwork: "https://goerli.infura.io/v3/YOUR_INFURA_PROJECT_ID", // Goerli testnet
         zksync: true
       }
     },
     solidity: {
       version: "0.8.18"
     },
     zksolc: {
       version: "1.3.5", // Example version
       compilerSource: "binary",
       settings: {}
     }
   };

   export default config;
   ```

### Step 3: Write the NFT Smart Contract

1. **Create the NFT contract:**

   Create a file named `NFT.sol` under the `contracts` directory:
   ```solidity
   // SPDX-License-Identifier: MIT
   pragma solidity ^0.8.0;

   import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
   import "@openzeppelin/contracts/access/Ownable.sol";

   contract MyNFT is ERC721, Ownable {
       uint256 public tokenCounter;

       constructor() ERC721("MyNFT", "NFT") {
           tokenCounter = 0;
       }

       function createNFT(address to) public onlyOwner returns (uint256) {
           uint256 newTokenId = tokenCounter;
           _safeMint(to, newTokenId);
           tokenCounter++;
           return newTokenId;
       }
   }
   ```

2. **Compile the contract:**
   ```bash
   npx hardhat compile
   ```

### Step 4: Write Deployment Script

1. **Create deployment script:**

   Create a file named `deploy.ts` under the `scripts` directory:
   ```typescript
   import { Wallet, Provider, utils } from "zksync-web3";
   import { ethers } from "hardhat";
   import * as dotenv from "dotenv";

   dotenv.config();

   const PRIVATE_KEY = process.env.PRIVATE_KEY || "";

   if (!PRIVATE_KEY) {
     throw new Error("Please set your PRIVATE_KEY in a .env file");
   }

   async function main() {
     const provider = new Provider("https://testnet.era.zksync.dev");
     const wallet = new Wallet(PRIVATE_KEY, provider);

     const factory = await ethers.getContractFactory("MyNFT", wallet);
     const nft = await factory.deploy();

     await nft.deployed();

     console.log(`NFT deployed to: ${nft.address}`);
   }

   main().catch((error) => {
     console.error(error);
     process.exit(1);
   });
   ```

### Step 5: Deploy the Contract

1. **Create a `.env` file:**
   ```
   PRIVATE_KEY=your_private_key_here
   ```

2. **Deploy the contract:**
   ```bash
   npx hardhat run scripts/deploy.ts --network zkSyncTestnet
   ```
