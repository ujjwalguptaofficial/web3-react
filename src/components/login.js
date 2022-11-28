import { getProviderInfoByName } from "web3modal"
import { createWeb3Modal } from "../utils";

export default function Login(props) {

    function getMetamaskLogo() {
        return getProviderInfoByName('MetaMask').logo;
    }

    async function connectToWallet() {
        const web3modal = createWeb3Modal();
        const provider = await web3modal.connectTo("custom-metamask");
        props.onWalletConnect(provider);
    }

    return (
        <div className="login">
            <div className="login_wallet">
                <h1>Connect to wallet</h1>
                <div className="flex">
                    <button className="flex" onClick={connectToWallet}>
                        <strong>Metamask </strong>
                        <img className="ml-10" src={getMetamaskLogo()} width="25" />
                    </button>
                </div>
            </div>
        </div>
    )
}