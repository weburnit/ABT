const Token = artifacts.require("AAA");
const AAAEth = artifacts.require("AAAEth");
const {deployProxy} = require("@openzeppelin/truffle-upgrades");

module.exports = async function(deployer) {
  const token = await Token.deployed()

  // Deploy Exchange
  await deployProxy(AAAEth, [token.address], {kind: 'uups', deployer: deployer});
  const exchange = await AAAEth.deployed()
  const totalSupply = await token.totalSupply();
  await token.transfer(exchange.address, totalSupply)
};
