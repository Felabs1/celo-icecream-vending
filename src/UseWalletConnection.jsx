import { useState } from "react";
import { web3, kit } from "./assets/celoFrontEnd";
export const useWalletConnection = (defaultValue) => {
  const [storedValue, setStoredValue] = useState(async () => {
    if (window.celo) {
      console.log("⚠️ Please approve this DApp to use it.");
      try {
        const address = window.celo.selectedAddress;
        kit.defaultAccount = address;
        return address;
      } catch (error) {
        console.log(`⚠️ ${error}.`);
        return defaultValue;
      }
    } else {
      console.log("⚠️ Please install the CeloExtensionWallet.");
      return defaultValue;
    }
  });

  const setValue = async (newValue) => {
    try {
      await window.celo.enable();
      const address = window.celo.selectedAddress;
      kit.defaultAccount = address;
    } catch (error) {}
    setStoredValue(newValue);
  };

  return [storedValue, setValue];
};
