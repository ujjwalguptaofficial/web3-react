export default function (props) {

    function sendTransaction() {
        props.sendTransaction(1000, props.walleAddress);
    }

    function sendEthTransaction() {
        props.sendEthTransaction(1000, props.walleAddress);
    }

    return (
        <div>
            <h1>WEB3 Demo</h1>
            <h5>Wallet Address: {props.walleAddress}</h5>
            <h5>ChainId : {props.chainId}</h5>
            <div>
                <button onClick={props.alertTokenName}>Get token Name</button>
            </div>
            <div>
                <button className='mt-20' onClick={props.alertUserBalance}>Get ERC20 user balance</button>
            </div>
            <div>
                <button className='mt-20' onClick={sendTransaction}>Send erc20 transaction</button>
            </div>
            <div>
                <button className='mt-20' onClick={sendEthTransaction}>Send ether</button>
            </div>
        </div>
    )
}