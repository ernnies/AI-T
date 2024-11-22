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
   npm install --save-dev @matterlabs/hardhat-zksync-solc
   npm install

