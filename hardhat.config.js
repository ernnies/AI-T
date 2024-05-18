require("@matterlabs/hardhat-zksync");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  zksync: {
    url: "https://rpc.zksync.io",
    ethNetwork: "mainnet",
    zksync: true,
  },
};
