require("@nomicfoundation/hardhat-toolbox")

/** @type import('hardhat/config').HardhatUserConfig */

require("dotenv").config()
require("@nomiclabs/hardhat-ethers")

// 终端代理 验证合约时使用
// export https_proxy=http://127.0.0.1:7890 http_proxy=http://127.0.0.1:7890 all_proxy=socks5://127.0.0.1:7890
const { setGlobalDispatcher, ProxyAgent } = require("undici")
const proxyAgent = new ProxyAgent("http://127.0.0.1:7890")
setGlobalDispatcher(proxyAgent)

const { ETHERSCAN_KEY, MAIN_RPC_URL, RPC_URL, WALLET_PRIVATE_KEY } = process.env

module.exports = {
  solidity: '0.8.9',
  etherscan: {
    apiKey: ETHERSCAN_KEY,
  },
  networks: {
    hardhat: {},
    // local need: npx hardhat node
    local: {
      url: 'http://127.0.0.1:8545/',
      accounts: [
        '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'
      ]
    },
    goerli: {
      url: RPC_URL,
      chainId: 5,
      accounts: [WALLET_PRIVATE_KEY],
    },
    mainnet: {
      url: MAIN_RPC_URL,
      chainId: 1,
      accounts: [WALLET_PRIVATE_KEY]
    }
  },
}
