# TRC-20 Token Implementation Guide

## Quick Start

### Prerequisites
- Node.js and npm installed
- TronBox CLI installed: `npm install -g tronbox`
- TRON wallet (TronLink, TokenPocket, etc.)

### Installation

```bash
# Clone the repository
git clone https://github.com/by-aneex/Token.git
cd Token

# Install dependencies
npm install
```

### Compilation

```bash
# Compile Solidity contracts
npm run compile
```

### Testing

```bash
# Run test suite
npm run test
```

### Deployment

#### Testnet (Shasta)
```bash
npm run deploy
```

#### Mainnet
```bash
npm run deploy:mainnet
```

## Smart Contract Overview

### TRC20Token.sol
The main token contract implementing the TRC-20 standard with the following features:

- **Configurable Parameters**: Name, symbol, decimals, and initial supply
- **Standard Functions**:
  - `transfer()` - Send tokens to another address
  - `approve()` - Approve spending by another address
  - `transferFrom()` - Transfer tokens using allowance
  - `balanceOf()` - Check token balance
  - `totalSupply()` - Get total token supply
  - `allowance()` - Check approved spending limit

- **Utility Functions**:
  - `increaseAllowance()` - Safely increase allowance
  - `decreaseAllowance()` - Safely decrease allowance

## Contract Parameters

When deploying, provide:
- `_name` - Token name (e.g., "My Token")
- `_symbol` - Token symbol (e.g., "MTK")
- `_decimals` - Decimal places (typically 18)
- `_initialSupply` - Initial token supply (will be multiplied by 10^decimals)

Example:
```solidity
TRC20Token token = new TRC20Token("My Token", "MTK", 18, 1000000);
// Creates 1,000,000 tokens with 18 decimal places
```

## Deployment Methods

### Using TronBox (Recommended)
1. Configure `tronbox.js` with your TRON network details
2. Place migration scripts in `migrations/` directory
3. Run `npm run deploy`

### Using TronIDE
1. Visit [TronIDE](https://tronide.io/)
2. Copy and paste contract code
3. Compile and deploy directly in the IDE
4. Connect with TronLink wallet

### Using TronWeb
```javascript
const TronWeb = require('tronweb');

const tronWeb = new TronWeb({
    fullHost: 'https://api.shasta.trongrid.io',
    privateKey: 'your_private_key_here'
});

// Compile and deploy contract
```

## Interacting with Deployed Token

### Using TronWeb
```javascript
const contract = await tronWeb.contract(contractABI, contractAddress);

// Transfer tokens
await contract.transfer('recipient_address', 1000000).send();

// Check balance
const balance = await contract.balanceOf('address').call();

// Approve spending
await contract.approve('spender_address', 1000000).send();
```

### Using Web3 Wallets
1. Add token to wallet using contract address
2. Use wallet UI for transfer and approval operations

## Security Considerations

- **No Owner/Admin Functions**: The contract does not include centralized owner controls
- **Read-Only After Deployment**: Contract behavior cannot be changed after deployment
- **Standard Compliance**: Fully implements TRC-20 interface
- **Gas Optimization**: Efficient contract implementation to minimize transaction costs

## Testing

The contract includes comprehensive tests covering:
- Basic transfers
- Allowance mechanisms
- Balance checks
- Edge cases (zero addresses, insufficient balance, etc.)

Run tests with:
```bash
npm run test
```

## Support & Issues

For issues or questions:
- Open an issue on [GitHub](https://github.com/by-aneex/Token/issues)
- Review TRC-20 standard documentation
- Check TRON development resources

## License

MIT License - See LICENSE file for details

## Disclaimer

This project implements the TRC-20 token standard. It is not affiliated with or endorsed by TRON DAO or Tether (USDT). Users are responsible for complying with applicable laws and blockchain best practices.
