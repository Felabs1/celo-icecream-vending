import React from "react";
import { Navigate } from "react-router-dom";
import { connectCeloWallet } from "../assets/celoFrontEnd";

const Login = () => {
  return (
    <div className="w3-center w3-text-white">
      {window.celo.selectedAddress && <Navigate to="/" />}
      <br />
      <br />
      <br />
      <br />
      <h1>Ice Cream Vending Assistant</h1>
      <p>Transparency, immutability, persistence</p>
      <button
        className="w3-button w3-blue w3-round-xxlarge"
        onClick={connectCeloWallet}
      >
        Connect Celo Wallet
      </button>
    </div>
  );
};

export default Login;
