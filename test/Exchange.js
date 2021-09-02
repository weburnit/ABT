const AAA = artifacts.require('AAA')
const AAAEth = artifacts.require('AAAEth')

require('chai')
  .use(require('chai-as-promised'))
  .should()

function tokens(n) {
  return web3.utils.toWei(n, 'ether');
}

contract('AAAEth', ([deployer, investor]) => {
  let token, exchange

  before(async () => {
    token = await AAA.deployed()
    exchange = await AAAEth.deployed()
    // Transfer all tokens to AAAEth (1 million)
  })

  describe('AAA deployment', async () => {
    it('contract has a name', async () => {
      const name = await token.name()
      assert.equal(name, 'Coin 4 Betting')
    })
  })

  describe('AAAEth deployment', async () => {
    it('contract has a name', async () => {
      const name = await exchange.name()
      assert.equal(name, 'Instant Exchange Contract')
    })

    it('contract has tokens', async () => {
      let balance = await token.balanceOf(exchange.address)
      assert.equal(balance.toString(), tokens('270000000'))
    })
  })

  describe('buy_tokens()', async () => {
    let result

    before(async () => {
      // Purchase tokens before each example
      result = await exchange.buyTokens({ from: investor, value: web3.utils.toWei('1', 'ether')})
    })

    it('Allows user to instantly purchase tokens from AAAEth for a fixed price', async () => {
      // Check investor AAA balance after purchase
      let investorBalance = await token.balanceOf(investor)
      assert.equal(investorBalance.toString(), tokens('100'))

      // Check AAAEth balance after purchase
      let AAAEthBalance
      AAAEthBalance = await token.balanceOf(exchange.address)
      assert.equal(AAAEthBalance.toString(), tokens('269999900'))
      AAAEthBalance = await web3.eth.getBalance(exchange.address)
      assert.equal(AAAEthBalance.toString(), web3.utils.toWei('1', 'Ether'))

      // Check logs to ensure event was emitted with correct data
      const event = result.logs[0].args
      assert.equal(event.account, investor)
      assert.equal(event.token, token.address)
      assert.equal(event.amount.toString(), tokens('100').toString())
      assert.equal(event.rate.toString(), '100')
    })
  })

  describe('sell_tokens()', async () => {
    let result

    before(async () => {
      // Approve to sell token
      await token.approve(exchange.address, tokens('100'), { from: investor })
      // then Investor sells tokens
      result = await exchange.sellTokens(tokens('100'), { from: investor })
    })

    it('Allows user to instantly sell tokens to AAAEth for a fixed price', async () => {
      // Check investor AAA balance after purchase
      let investorBalance = await token.balanceOf(investor)
      assert.equal(investorBalance.toString(), tokens('0'))

      // Check AAAEth balance after purchase
      let AAAEthBalance
      AAAEthBalance = await token.balanceOf(exchange.address)
      assert.equal(AAAEthBalance.toString(), tokens('270000000'))
      AAAEthBalance = await web3.eth.getBalance(exchange.address)
      assert.equal(AAAEthBalance.toString(), web3.utils.toWei('0', 'Ether'))

      // Check logs to ensure event was emitted with correct data
      const event = result.logs[0].args
      assert.equal(event.account, investor)
      assert.equal(event.token, token.address)
      assert.equal(event.amount.toString(), tokens('100').toString())
      assert.equal(event.rate.toString(), '100')

      // FAILURE: investor can't sell more tokens than they have
      await exchange.sellTokens(tokens('500'), { from: investor }).should.be.rejected;
    })
  })

})
