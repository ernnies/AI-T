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
