import './App.css';
import React, { useEffect, useRef, useState } from "react";
import { Contract, ethers } from 'ethers';

export function App() {

  const [isLoaded, setIsLoaded] = useState(false);
  let contract = useRef();

  useEffect(() => {
    const initContract = async () => {
      const provider = new ethers.providers.JsonRpcProvider('https://polygon-rpc.com');
      const response = await fetch("https://raw.githubusercontent.com/ujjwalguptaofficial/ethcontracts/main/abi/erc20.json");
      const abi = await response.json();
      contract.current = new Contract("0x8f3cf7ad23cd3cadbd9735aff958023239c6a063", abi, provider);
      setIsLoaded(true);
    };
    initContract();
  }, [])

  async function alertTokenName() {
    const name = await contract.current.functions.name();
    alert(`token name is ${name}`);
  }

  async function alertTokenSymbol() {
    const symbol = await contract.functions.symbol();
    alert(`token symbol is ${symbol}`);
  }

  return (
    <div className="App">
      {(() => {
        if (isLoaded) {
          return (
            <div>
              <h1>EthContract.js Demo</h1>
              <button onClick={alertTokenName}>Get token Name</button>
              <div>
                <button className='mt-20' onClick={alertTokenSymbol}>Get token symbol</button>
              </div>
            </div>
          )
        }
        else {
          return (
            <div>
              Loading...
            </div>
          )
        }
      })()
      }
    </div>
  );
}

export default App;
