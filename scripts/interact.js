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