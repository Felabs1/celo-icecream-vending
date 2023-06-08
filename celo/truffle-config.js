const HDWalletProvider = require("@truffle/hdwallet-provider");
require("dotenv").config();
module.exports = {
  networks: {
    testnet: {
      provider: function () {
        return new HDWalletProvider(
          process.env.MNEMONIC,
          "https://alfajores-forno.celo-testnet.org"
        );
      },
      network_id: 44787,
      gas: 20000000,
    },
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*", // Match any network id
      gas: 5000000,
    },
  },
  compilers: {
    solc: {
      settings: {
        optimizer: {
          enabled: true, // Default: false
          runs: 200, // Default: 200
        },
      },
    },
  },
};
