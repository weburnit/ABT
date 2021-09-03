const AAA = artifacts.require("AAA");

const {deployProxy} = require("@openzeppelin/truffle-upgrades");

module.exports = async function (deployer) {
    const instance = await deployProxy(AAA, {kind: 'uups', deployer: deployer})
    console.log("Deployed to address ", instance.address)
}