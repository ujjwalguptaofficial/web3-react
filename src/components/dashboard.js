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
            <div className="border">
                <h4>ERC20</h4>
                <div>
                    <button onClick={props.alertTokenName}>Get token Name</button>
                </div>
                <div>
                    <button className='mt-20' onClick={props.alertUserBalance}>Get balance</button>
                </div>
                <div>
                    <button className='mt-20' onClick={sendTransaction}>Send transaction</button>
                </div>
            </div>
            <div className="border mt-20">
                <h4>Ether(Native token)</h4>
                <div>
                    <button className='mt-20' onClick={props.getEthBalance}>Get Balance</button>
                </div>
                <div>
                    <button className='mt-20' onClick={sendEthTransaction}>Send ether</button>
                </div>
            </div>
        </div>
    )
}