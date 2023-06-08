import Web3 from "web3";
import { newKitFromWeb3 } from "@celo/contractkit";
import { Navigate } from "react-router-dom";
import { abi } from "./abi";
while (!window.celo) {
  alert("please install celo wallet");
}
export const web3 = new Web3(window.celo);
export const kit = newKitFromWeb3(web3);
const contract33 = "0x30151187f132A9E9F4cdc9CFF3cf6466aCEBDFe2";
export const contract = new kit.web3.eth.Contract(abi, contract33);

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
