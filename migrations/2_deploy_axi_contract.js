const AXI = artifacts.require("AAA");

const {deployProxy} = require("@openzeppelin/truffle-upgrades");

module.exports = async function (deployer) {
    const instance = await deployProxy(AXI, {kind: 'uups', deployer: deployer})
    console.log("Deployed to address ", instance.address)
}