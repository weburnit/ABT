// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/AAA.sol";

contract TestAAA is AAA {
    AAA funnyCoin;

    function beforeEach() public {
        funnyCoin = new AAA();
        funnyCoin.initialize();
    }

    function testInitialTokenSupplyDeployedContract() public {
        uint256 supply = funnyCoin.totalSupply();
        uint256 expected = 270000000 * uint256(10) ** 18;
        Assert.equal(expected, supply, "Total supply");
    }
}
