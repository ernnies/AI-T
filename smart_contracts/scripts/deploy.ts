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
