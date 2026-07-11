const TRC20Token = artifacts.require('TRC20Token');

contract('TRC20Token', (accounts) => {
  let token;
  const owner = accounts[0];
  const recipient = accounts[1];
  const spender = accounts[2];
  
  const tokenName = 'Test Token';
  const tokenSymbol = 'TST';
  const decimals = 18;
  const initialSupply = 1000000;
  
  beforeEach(async () => {
    token = await TRC20Token.new(
      tokenName,
      tokenSymbol,
      decimals,
      initialSupply,
      { from: owner }
    );
  });

  describe('Initialization', () => {
    it('should have correct name', async () => {
      const name = await token.name();
      assert.equal(name, tokenName, 'Token name is incorrect');
    });

    it('should have correct symbol', async () => {
      const symbol = await token.symbol();
      assert.equal(symbol, tokenSymbol, 'Token symbol is incorrect');
    });

    it('should have correct decimals', async () => {
      const dec = await token.decimals();
      assert.equal(dec, decimals, 'Token decimals is incorrect');
    });

    it('should have correct total supply', async () => {
      const supply = await token.totalSupply();
      const expectedSupply = initialSupply * (10 ** decimals);
      assert.equal(supply.toString(), expectedSupply.toString(), 'Total supply is incorrect');
    });

    it('should give owner all initial tokens', async () => {
      const balance = await token.balanceOf(owner);
      const expectedSupply = initialSupply * (10 ** decimals);
      assert.equal(balance.toString(), expectedSupply.toString(), 'Owner balance is incorrect');
    });
  });

  describe('Transfer', () => {
    it('should transfer tokens successfully', async () => {
      const amount = web3.utils.toWei('100', 'ether');
      const initialBalance = await token.balanceOf(owner);
      
      await token.transfer(recipient, amount, { from: owner });
      
      const finalBalance = await token.balanceOf(owner);
      assert.equal(finalBalance.toString(), initialBalance.sub(web3.utils.toBN(amount)).toString(), 'Owner balance incorrect after transfer');
      
      const recipientBalance = await token.balanceOf(recipient);
      assert.equal(recipientBalance.toString(), amount, 'Recipient balance incorrect after transfer');
    });

    it('should fail to transfer to zero address', async () => {
      const amount = web3.utils.toWei('100', 'ether');
      
      try {
        await token.transfer('0x0000000000000000000000000000000000000000', amount, { from: owner });
        assert.fail('Should have thrown an error');
      } catch (error) {
        assert(error.message.includes('transfer to the zero address'), 'Error message incorrect');
      }
    });

    it('should fail to transfer more than balance', async () => {
      const amount = web3.utils.toWei('999999999999', 'ether');
      
      try {
        await token.transfer(recipient, amount, { from: owner });
        assert.fail('Should have thrown an error');
      } catch (error) {
        assert(error.message.includes('insufficient balance'), 'Error message incorrect');
      }
    });
  });

  describe('Approve and Allowance', () => {
    it('should approve spending', async () => {
      const amount = web3.utils.toWei('100', 'ether');
      
      await token.approve(spender, amount, { from: owner });
      
      const allowance = await token.allowance(owner, spender);
      assert.equal(allowance.toString(), amount, 'Allowance not set correctly');
    });

    it('should fail to approve zero address', async () => {
      const amount = web3.utils.toWei('100', 'ether');
      
      try {
        await token.approve('0x0000000000000000000000000000000000000000', amount, { from: owner });
        assert.fail('Should have thrown an error');
      } catch (error) {
        assert(error.message.includes('approve to the zero address'), 'Error message incorrect');
      }
    });
  });

  describe('TransferFrom', () => {
    it('should transfer from with allowance', async () => {
      const amount = web3.utils.toWei('100', 'ether');
      
      // Approve spender
      await token.approve(spender, amount, { from: owner });
      
      // Transfer from owner to recipient
      await token.transferFrom(owner, recipient, amount, { from: spender });
      
      const recipientBalance = await token.balanceOf(recipient);
      assert.equal(recipientBalance.toString(), amount, 'Recipient balance incorrect');
      
      const allowance = await token.allowance(owner, spender);
      assert.equal(allowance.toString(), '0', 'Allowance not decreased');
    });

    it('should fail transferFrom without sufficient allowance', async () => {
      const amount = web3.utils.toWei('100', 'ether');
      
      try {
        await token.transferFrom(owner, recipient, amount, { from: spender });
        assert.fail('Should have thrown an error');
      } catch (error) {
        assert(error.message.includes('insufficient allowance'), 'Error message incorrect');
      }
    });
  });

  describe('Increase and Decrease Allowance', () => {
    it('should increase allowance', async () => {
      const initialAmount = web3.utils.toWei('100', 'ether');
      const additionalAmount = web3.utils.toWei('50', 'ether');
      
      await token.approve(spender, initialAmount, { from: owner });
      await token.increaseAllowance(spender, additionalAmount, { from: owner });
      
      const allowance = await token.allowance(owner, spender);
      const expectedAllowance = web3.utils.toBN(initialAmount).add(web3.utils.toBN(additionalAmount));
      assert.equal(allowance.toString(), expectedAllowance.toString(), 'Allowance not increased correctly');
    });

    it('should decrease allowance', async () => {
      const initialAmount = web3.utils.toWei('100', 'ether');
      const decreaseAmount = web3.utils.toWei('30', 'ether');
      
      await token.approve(spender, initialAmount, { from: owner });
      await token.decreaseAllowance(spender, decreaseAmount, { from: owner });
      
      const allowance = await token.allowance(owner, spender);
      const expectedAllowance = web3.utils.toBN(initialAmount).sub(web3.utils.toBN(decreaseAmount));
      assert.equal(allowance.toString(), expectedAllowance.toString(), 'Allowance not decreased correctly');
    });
  });

  describe('BalanceOf', () => {
    it('should return correct balance', async () => {
      const balance = await token.balanceOf(owner);
      const expectedSupply = initialSupply * (10 ** decimals);
      assert.equal(balance.toString(), expectedSupply.toString(), 'Balance incorrect');
    });

    it('should return zero for non-token holder', async () => {
      const balance = await token.balanceOf(accounts[3]);
      assert.equal(balance.toString(), '0', 'Balance should be zero');
    });
  });
});
