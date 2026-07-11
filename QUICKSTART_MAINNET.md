# Quick Start - Mainnet Deployment to Wallet

## 🎯 Your Wallet Address
```
TKHwbmYPvcLSTGaUfi7UhsqkNTMqkaRKhj
```

## 📊 Repository Status
- **Repo**: by-aneex/Token
- **Language**: 62.1% JavaScript, 37.9% Solidity
- **Status**: ✅ Production Ready

---

## 🚀 Quick Deployment Steps (5 minutes)

### Step 1: Prepare Environment
```bash
# Clone repo (if not already cloned)
git clone https://github.com/by-aneex/Token.git
cd Token

# Install dependencies
npm install

# Create .env file with your mainnet private key
cp .env.example .env

# Edit .env and add:
# PRIVATE_KEY_MAINNET=your_private_key_here
nano .env
```

### Step 2: Verify Setup
```bash
# Compile contract
npm run compile

# Run tests
npm run test
```

### Step 3: Deploy to Mainnet
```bash
# Make deployment script executable
chmod +x scripts/deploy.sh

# Run deployment script
bash scripts/deploy.sh

# Select option: 2 (TRON Mainnet)
# Confirm: yes
```

### Step 4: Save Contract Address
After successful deployment, you'll receive:
```
Contract Address: TRxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```
**SAVE THIS ADDRESS!**

---

## 📍 Monitor Deployment

### Check on TronScan
1. Go to: https://tronscan.org
2. Paste your contract address
3. Verify the contract source code
4. Check holder balances

### Check Your Wallet
1. Go to: https://tronscan.org/#/address/TKHwbmYPvcLSTGaUfi7UhsqkNTMqkaRKhj
2. Look for your token in "Tokens" section
3. Verify balance

---

## 💰 Token Distribution (After Deployment)

Your deployed token will automatically:
- ✅ Create initial supply
- ✅ Assign all tokens to your wallet address
- ✅ Allow transfers to other wallets

### Transfer Tokens to Other Wallets

**Using TronLink Wallet:**
1. Open TronLink extension
2. Add your token by contract address
3. Click "Send"
4. Enter recipient address
5. Enter amount
6. Confirm transaction

**Using Smart Contract (Manual):**
```javascript
// In browser console with TronWeb
const contractAddress = 'YOUR_CONTRACT_ADDRESS';
const recipientAddress = 'TRXXXXXX...';
const amount = '1000000000000000000'; // 1 token (18 decimals)

const contract = await tronWeb.contract(TOKEN_ABI, contractAddress);
await contract.transfer(recipientAddress, amount).send();
```

---

## 🔐 Security Checklist

Before deployment, verify:

- [ ] .env file created and NOT committed to git
- [ ] Private key is correct format (64 hex characters)
- [ ] At least 50 TRX in wallet for gas
- [ ] All tests pass locally
- [ ] Contract parameters customized in migration file

---

## 📋 Deployment Parameters (Customize Before Deploy)

Edit: `migrations/1_deploy_trc20_token.js`

```javascript
const tokenName = 'My Token';        // Change this
const tokenSymbol = 'MYTOKEN';       // Change this
const decimals = 18;                 // Usually 18
const initialSupply = 1000000;       // Change this
```

**Example Configurations:**

```javascript
// Config 1: Large Community Token
const tokenName = 'Community Token';
const tokenSymbol = 'COMM';
const decimals = 18;
const initialSupply = 100000000;     // 100M tokens

// Config 2: Deflationary Token
const tokenName = 'Elite Token';
const tokenSymbol = 'ELITE';
const decimals = 18;
const initialSupply = 500000;        // 500k tokens

// Config 3: Utility Token
const tokenName = 'DeFi Protocol';
const tokenSymbol = 'DEFI';
const decimals = 8;
const initialSupply = 1000000000;    // 1B tokens
```

---

## ⚠️ After Deployment - Important Steps

### 1. Verify Contract on TronScan
```
1. Go to your contract on TronScan
2. Click "Verify Contract"
3. Paste source code from contracts/Token.sol
4. Set Compiler: v0.8.0
5. Set Optimization: 200 runs
6. Submit
```

### 2. Add to Wallet
```
TronLink:
1. Click "+" next to Tokens
2. Paste contract address
3. Token auto-fills
4. Click Add
```

### 3. Test Transfer
```
1. Send small amount to test wallet
2. Verify receipt
3. Test approve + transferFrom
```

### 4. Monitor Contract
```
TronScan:
- Watch contract for activity
- Monitor holder count
- Check trading volume
```

---

## 📞 Troubleshooting

### "Insufficient TRX"
- Get more TRX from exchange (Binance, OKEx, etc.)
- Minimum: 50 TRX

### "Network Error"
- Check internet connection
- Verify TronGrid API online
- Try alternate node

### "Deployment Failed"
- Check .env file has PRIVATE_KEY_MAINNET
- Verify private key format
- Ensure account has TRX

### "Contract Not Showing"
- Wait 1-2 minutes for blockchain confirmation
- Refresh TronScan page
- Check transaction hash for errors

---

## 🎨 Next Steps (Optional)

### 1. Create Logo
- Use Figma: https://figma.com
- Use Canva: https://canva.com
- Store in: `assets/logo/`

### 2. List on CoinGecko
- Go to: https://www.coingecko.com/en/request-form
- Submit token info
- Usually approved in 2-4 days

### 3. Add Liquidity (DEX Trading)
- SunSwap: https://sunswap.com
- JustSwap: https://justswap.org
- Pair with USDT or TRX

### 4. Build Community
- Twitter: https://twitter.com
- Telegram: https://telegram.org
- Discord: https://discord.com

---

## 📊 Repository Statistics

```
Repository: by-aneex/Token
ID: 1297498074

Language Composition:
├── JavaScript: 62.1%
└── Solidity: 37.9%

Files:
├── contracts/Token.sol (Solidity)
├── migrations/ (JavaScript)
├── test/ (JavaScript)
├── scripts/ (Bash/JavaScript)
└── Docs (Markdown)
```

---

## 🎯 Final Checklist Before Mainnet

- [ ] Repository cloned locally
- [ ] Dependencies installed (`npm install`)
- [ ] Contract compiles successfully (`npm run compile`)
- [ ] All tests pass (`npm run test`)
- [ ] `.env` file created with PRIVATE_KEY_MAINNET
- [ ] Private key backed up securely
- [ ] At least 50 TRX in wallet for deployment
- [ ] Token parameters customized (name, symbol, supply)
- [ ] Deployment script is executable (`chmod +x scripts/deploy.sh`)
- [ ] Ready to deploy!

---

## 🚀 Deploy Now!

```bash
# Final deployment command
bash scripts/deploy.sh

# Follow prompts:
# 1. Select: 2 (Mainnet)
# 2. Confirm: yes
# 3. Wait for deployment
# 4. SAVE CONTRACT ADDRESS
```

---

**Your TRC-20 Token is ready for mainnet! 🎉**

Contract Address will be: `TRxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
Tokens will be sent to: `TKHwbmYPvcLSTGaUfi7UhsqkNTMqkaRKhj`

Good luck! 🚀

For questions: Check MAINNET_DEPLOYMENT.md or SECURITY.md
