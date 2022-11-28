import './App.css';
import React, { useEffect, useRef, useState } from "react";
import { Contract, ethers, providers } from 'ethers';
import Login from "./components/login";
import Dashboard from "./components/dashboard";

export function App() {

  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const contract = useRef();
  const [walleAddress, setWalletAddress] = useState("");
  const [chainId, setChainId] = useState("");
  const web3Provider = useRef();
  // new ethers.providers.JsonRpcProvider('https://polygon-rpc.com');


  async function initContract() {
    const response = await fetch("https://raw.githubusercontent.com/ujjwalguptaofficial/ethcontracts/main/abi/erc20.json");
    const abi = await response.json();
    const signer = web3Provider.current.getSigner();
    contract.current = new Contract("0x6B175474E89094C44Da98b954EedeAC495271d0F", abi, signer);
    setIsWalletConnected(true);
    const address = await signer.getAddress();
    const chainIdFromprovider = await signer.getChainId();
    setWalletAddress(address);
    setChainId(chainIdFromprovider);
  };

  async function alertTokenName() {
    const name = await contract.current.functions.name();
    alert(`token name is ${name}`);
  }

  async function alertUserBalance() {
    const balance = await contract.current.functions.balanceOf(walleAddress);
    alert(`user balance is ${balance}`);
  }

  async function sendTransaction(amount, to) {
    const balance = await contract.current.functions.transfer(to, amount, {
      gasLimit: 5000
    });
    alert("transaction hash is :", balance.hash);
  }

  async function sendEthTransaction(amount, to) {
    const signer = web3Provider.current.getSigner();
    signer.sendTransaction({
      to: to,
      value: amount //ethers.utils.parseEther(amount, 'ether')
    });
  }

  async function getEthBalance(amount, to) {
    const balance = await web3Provider.current.getBalance(walleAddress);
    alert(`user balance is ${balance}`);
  }


  function onWalletConnect(provider) {
    web3Provider.current = new providers.Web3Provider(provider);
    initContract(provider);
  }


  const loginComponent = !isWalletConnected ? <Login onWalletConnect={onWalletConnect} /> : (
    <Dashboard walleAddress={walleAddress}
      chainId={chainId}
      alertTokenName={alertTokenName}
      alertUserBalance={alertUserBalance}
      sendTransaction={sendTransaction}
      getEthBalance={getEthBalance}
      sendEthTransaction={sendEthTransaction} />
  )
  return (
    <div className="App">
      {loginComponent}

    </div>
  );
}

export default App;
