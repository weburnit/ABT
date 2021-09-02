const Token = artifacts.require("AAA");
const AAAEth = artifacts.require("AAAEth");

module.exports = async function(deployer) {
  const token = await Token.deployed()

  // Deploy Exchange
  await deployer.deploy(AAAEth, token.address);
  const exchange = await AAAEth.deployed()
  const totalSupply = await token.totalSupply();
  await token.transfer(exchange.address, totalSupply)
};
