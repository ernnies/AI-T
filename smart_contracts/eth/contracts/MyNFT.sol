// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyNFT is ERC721, Ownable {
    uint256 public tokenCounter;

    constructor() ERC721("MyNFT", "NFT") {
        tokenCounter = 0;
    }

    function createNFT(address to) external onlyOwner returns (uint256) {
        _safeMint(to, tokenCounter);
        return tokenCounter++;
    }
}
