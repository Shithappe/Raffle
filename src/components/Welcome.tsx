import { ConnectButton } from "@suiet/wallet-kit";
import '@suiet/wallet-kit/style.css';



function Welcome() {
  return (
    <div className="welcome">

        <div className="intro">
            <div className="video">
                <video src="https://rr2---sn-xaxjugvonx8a0ni-0qwe.googlevideo.com/videoplayback?expire=1673658662&ei=xqzBY6_9Cq-akASC16ywAg&ip=216.131.104.173&id=o-AKPPVmDZgYG94jbUPQKWQj7SKgmmEDBABoK26smfnImF&itag=137&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278&source=youtube&requiressl=yes&spc=zIddbIDMuXUvYwjJ6obF3KzdvWXB594&vprv=1&mime=video%2Fmp4&ns=se4QevPllDryQa402H1IClEK&gir=yes&clen=25355990&dur=66.240&lmt=1668010099290553&keepalive=yes&fexp=24007246&c=WEB&txp=5319224&n=ftei0tlgSum8Ng&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cspc%2Cvprv%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&sig=AOq0QJ8wRAIhAJx36Jn_WkAMC94j1JsSWC5C-JFUJL5RpbmAEyn3nmiJAh8steuloP3tHdqycsS9ubp3belu1VumqihpDvaBbaRg&redirect_counter=1&rm=sn-p5qees7l&req_id=b4cd91b8d885a3ee&cms_redirect=yes&ipbypass=yes&mh=wr&mip=91.195.157.115&mm=31&mn=sn-xaxjugvonx8a0ni-0qwe&ms=au&mt=1673636713&mv=m&mvi=2&pcm2cms=yes&pl=23&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pcm2cms,pl&lsig=AG3C_xAwRAIgPSCILqMrUEtHSBNuEGe2quB366FkM2SKho179m0_JfkCIBu7Ig3An4w8zZ8napC7UzCd9YGWE8DMqJafpAoRPIXl" autoPlay muted loop></video>
            </div>

            <div className="intro_content">
                <div className="container_welcome">
                    <h2>Already on our Discord? </h2>
                    <h1>JOIN THE RAFFLE</h1>
                    <h3>We use an algorithm of a quantum computer for our raffles</h3>
                    <ConnectButton label="Connect Wallet"/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Welcome