import './App.css';
import React, { useEffect, useRef, useState } from "react";
import { Contract, ethers, providers } from 'ethers';
import Login from "./components/login";

export function App() {

  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const contract = useRef();
  const [walleAddress, setWalletAddress] = useState("");
  // new ethers.providers.JsonRpcProvider('https://polygon-rpc.com');


  async function initContract(provider) {
    const response = await fetch("https://raw.githubusercontent.com/ujjwalguptaofficial/ethcontracts/main/abi/erc20.json");
    const abi = await response.json();
    const web3Provider = new providers.Web3Provider(provider);
    contract.current = new Contract("0x8f3cf7ad23cd3cadbd9735aff958023239c6a063", abi, web3Provider);
    setIsWalletConnected(true);
    const address = await web3Provider.getSigner().getAddress();
    setWalletAddress(address);
  };

  async function alertTokenName() {
    const name = await contract.current.functions.name();
    alert(`token name is ${name}`);
  }

  async function alertTokenSymbol() {
    const symbol = await contract.functions.symbol();
    alert(`token symbol is ${symbol}`);
  }

  function onWalletConnect(provider) {
    initContract(provider);
  }


  const loginComponent = !isWalletConnected ? <Login onWalletConnect={onWalletConnect} /> : <div>
    <h1>WEB3 Demo</h1>
    <h5>Wallet Address: {walleAddress}</h5>
    <button onClick={alertTokenName}>Get token Name</button>
    <div>
      <button className='mt-20' onClick={alertTokenSymbol}>Get token symbol</button>
    </div>
  </div>;
  return (
    <div className="App">
      {loginComponent}

    </div>
  );
}

export default App;
