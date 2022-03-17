// SPDX-License-Identifier: MIT

// JSON File url pinata: https://gateway.pinata.cloud/ipfs/QmbWyKmJiUNyLh98p1ctDqPJHCP48x3dYLPKHkg25tGwCV/

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract AnimeCollection is ERC1155, Ownable {
    string public name;
    string public symbol;
    uint256 public tokenCount;
    string public baseUri;

    constructor(string memory _name,string memory _symbol,string memory _baseUri) ERC1155(_baseUri) {
        name = _name;
        symbol = _symbol;
        baseUri = _baseUri;
    }

    function mint(uint256 amount) public onlyOwner {
        tokenCount += 1;
        _mint(msg.sender, tokenCount, amount, "");
    }

    function concatenate(string memory str1, string memory str2) pure private returns(string memory) {
    bytes memory str_bytes1 = bytes(str1);
    bytes memory str_bytes2 = bytes(str2);
    string memory str = new string(str_bytes1.length + str_bytes2.length);
    bytes memory str_bytes = bytes(str);
    uint k = 0;
    for(uint i = 0; i < str_bytes1.length; i++) {
      str_bytes[k] = str_bytes1[i];
      k++;
    }
    for(uint i = 0; i < str_bytes2.length; i++) {
      str_bytes[k] = str_bytes2[i];
      k++;
    }

    return string(str_bytes);
  }

    function uri(uint256 _tokenId) override public view returns(string memory) {
        string memory baseName = concatenate("img", Strings.toString(_tokenId));
        return string (
            abi.encodePacked(
                baseUri, // URL
                baseName, // img+Token Id
                ".json" // + Json
            )
        ); 
    }
}