import { getProviderInfoByName } from "web3modal";

export const metamask = {
    display: {
        logo: getProviderInfoByName('MetaMask').logo,
        name: 'MetaMask',
        description: "Connect to your MetaMask wallet"
    },
    package: true,
    async connector() {
        const ethereum = window.ethereum;

        const handleMetamaskNotInstalled = () => {
            window.open("https://metamask.io/download/", '_blank');
        };

        const connectToMetaMask = async (provider) => {
            await provider.request({ method: 'eth_requestAccounts' });
            return provider;
        }

        // Case 1: There is no injected provider available
        // Resolution: Open MetaMask download in new tab
        if (ethereum == undefined) {
            //console.log("No Injected Providers Available");
            handleMetamaskNotInstalled();
            return;
        }
        // Case 2: There are multiple providers available.
        // Resolution: Check if an injected provider is Metamask,
        //  if true, return the provider. If false, open MetaMask download
        //  in new tab.
        else if (ethereum.providers !== undefined) {
            let providers = ethereum.providers;
            let provider = providers.find((p) => p.isMetaMask); // <-- LOOK HERE
            if (provider) {
                return connectToMetaMask(provider);
            } else {
                //console.log("MetaMask not an available provider");
                handleMetamaskNotInstalled();
                return;
            }
        }
        // Case 3: There is one injected provider available.
        // Resolution: If it is MetaMask, return the provider.
        //  Otherwise, open download in new tab.
        else if (
            ethereum.providers == null &&
            ethereum.isMetaMask == true
        ) {
            //console.log("MetaMask is the single injected provider");
            let provider = ethereum;
            return connectToMetaMask(provider);
        } else {
            handleMetamaskNotInstalled();
            return;
        }
    }
}
