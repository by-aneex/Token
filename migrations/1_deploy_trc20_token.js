const TRC20Token = artifacts.require('TRC20Token');

module.exports = function(deployer) {
  // Deploy parameters
  const tokenName = 'My Token';
  const tokenSymbol = 'MTK';
  const decimals = 18;
  const initialSupply = 1000000;

  deployer.deploy(
    TRC20Token,
    tokenName,
    tokenSymbol,
    decimals,
    initialSupply
  );
};
