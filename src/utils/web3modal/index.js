import Web3Modal from "web3modal";
import { metamask } from "./metamask";

export const createWeb3Modal = () => {
    return new Web3Modal({
        disableInjectedProvider: true,
        cacheProvider: true,
        providerOptions: {
            'custom-metamask': metamask,
            // ADD OTHER WALLETS HERE
        }
    })
}