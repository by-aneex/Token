module.exports = {
  networks: {
    shasta: {
      privateKey: process.env.PRIVATE_KEY,
      consume_user_resource_percent: 30,
      fee_limit: 100000000,
      fullHost: 'https://api.shasta.trongrid.io',
      network_id: '2'
    },
    mainnet: {
      privateKey: process.env.PRIVATE_KEY_MAINNET,
      consume_user_resource_percent: 30,
      fee_limit: 100000000,
      fullHost: 'https://api.trongrid.io',
      network_id: '1'
    },
    development: {
      rpc: {
        host: 'http://127.0.0.1',
        port: 9090
      },
      privateKey: 'da146374a75310b9666e834ee4ad0866d6f4035967bfc76f541c1fca84f115d7',
      consume_user_resource_percent: 30,
      fee_limit: 100000000,
      network_id: '9'
    }
  },
  compilers: {
    solc: {
      version: '0.8.0'
    }
  }
};
