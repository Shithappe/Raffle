import { ConnectButton } from "@suiet/wallet-kit";
import '@suiet/wallet-kit/style.css';



function Welcome() {
  return (
    <div className="welcome">

    <div>Welcome</div>
    <canvas id="myCanvas"></canvas>
    <ConnectButton label="Connect Wallet"/>
    </div>
  )
}

export default Welcome