// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract AAA is Initializable, ERC20Upgradeable, UUPSUpgradeable, OwnableUpgradeable {
    function initialize() public initializer {
        __ERC20_init("Coin 4 Betting", "AAA");
        __Ownable_init();
        _mint(msg.sender, 270000000 * uint256(10) ** 18);
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}
}
//New version
//pragma solidity <0.9.0;
//
//import "./AAA.sol";
//import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
//import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
//import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
//import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
//
//contract AAAV2 is AAA {
//    function version() public pure returns(string memory) {
//        return "v2!";
//    }
//}
// Deploy new version
//const AAA = artifacts.require("AAA");
//const AAAV2 = artifacts.require("AAAV2");
//
//
//const { upgradeProxy } = require('@openzeppelin/truffle-upgrades');
//
//module.exports = async function (deployer) {
//    const existing = await AAA.deployed()
//    const instance = await upgradeProxy(existing.address, AAAV2, {kind: 'uups', deployer: deployer})
//};