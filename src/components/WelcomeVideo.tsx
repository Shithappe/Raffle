import { ConnectButton } from "@suiet/wallet-kit";
import '@suiet/wallet-kit/style.css';



function WelcomeVideo() {
    return (
        <div className="welcome_video">

            <div className="intro">
                <div className="video">
                    <video src="https://rr2---sn-4g5edn6y.googlevideo.com/videoplayback?expire=1673957266&ei=MjvGY-X0CLeKvdIP3LeO2A8&ip=185.147.212.50&id=o-ADdc58taZWIxdsbW1nPfPZTE85dGm_nHrkXHLyAlHtac&itag=137&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278&source=youtube&requiressl=yes&spc=zIddbHupbYgFF5APBJtLtLCUMjXgjBc&vprv=1&mime=video%2Fmp4&ns=jHuaeEqtLVHugogU6buMj-EK&gir=yes&clen=25355990&dur=66.240&lmt=1668010099290553&keepalive=yes&fexp=24007246&c=WEB&txp=5319224&n=QDE0d-ppVfzKZA&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cspc%2Cvprv%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&sig=AOq0QJ8wRQIhANp4PXAqyBRnyQrx-1nY0Fsgs0YjvIr6TyzD4XKmwbpAAiB9sWo4_HRjir5z808LT1yZpi-ifKEG5l2g6pl8U3e5YA%3D%3D&redirect_counter=1&rm=sn-25gkz7s&req_id=c80d502a6b34a3ee&cms_redirect=yes&cmsv=e&ipbypass=yes&mh=wr&mip=154.28.188.235&mm=31&mn=sn-4g5edn6y&ms=au&mt=1673934870&mv=u&mvi=2&pl=23&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRQIgFhFxrP8lWB5ZJUbZph7_t8mBFw4M8T743vMUAXv5HrwCIQDuhUz1AjvpH5FY0qf2ZEq37Xy4ImlymczCSqrHku-KfQ%3D%3D" autoPlay muted loop></video>
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