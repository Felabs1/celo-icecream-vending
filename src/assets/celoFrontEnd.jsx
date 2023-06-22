import Web3 from "web3";
import { newKitFromWeb3 } from "@celo/contractkit";
import { Navigate } from "react-router-dom";
import { abi } from "./abi";
while (!window.celo) {
  alert("please install celo wallet");
}

export const web3 = new Web3(window.celo);
export const kit = newKitFromWeb3(web3);
const contract33 = "0x674cd7d014d6eA33d49c11D608B45DA102d2545C";
// const contract33 = "0x8FaD925980cdCcF5404e9e4E97999F412f14a357";
// const contract33 = "0x5Fc3DA99d32E6070C044dC16F5807c228623d310";
export const contract = new kit.web3.eth.Contract(abi, contract33);

export const owner = async () => {
  const owner = await contract.methods.owner().call();
  return owner;
};

export const connectCeloWallet = async () => {
  if (window.celo) {
    console.log("⚠️ Please approve this DApp to use it.");
    try {
      await window.celo.enable();
      const accounts = await kit.web3.eth.getAccounts();
      kit.defaultAccount = accounts[0];
      window.location.href = "";
    } catch (error) {
      console.log(`⚠️ ${error}.`);
    }
  } else {
    console.log("⚠️ Please install the CeloExtensionWallet.");
  }
};
