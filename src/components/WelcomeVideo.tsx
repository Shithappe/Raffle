import { ConnectButton } from "@suiet/wallet-kit";
import '@suiet/wallet-kit/style.css';



function WelcomeVideo() {
    return (
        <div className="welcome_video">

            <div className="intro">
                <div className="video">
                    <video src="./video/videoBg.mp4" autoPlay muted loop></video>
                </div>

                <div className="intro_content">
                    <div className="container_welcome">
                        <h2>Already on our Discord? </h2>
                        <h1>JOIN THE RAFFLE</h1>
                        <ConnectButton label="Connect Wallet" />
                        <h3>We use an algorithm of a quantum computer for our raffles</h3>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default WelcomeVideo