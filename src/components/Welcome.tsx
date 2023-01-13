import { ConnectButton } from "@suiet/wallet-kit";
import '@suiet/wallet-kit/style.css';



function Welcome() {
  return (
    <div className="welcome">

        <div className="intro">
            <div className="video">
                <video src="https://rr2---sn-4g5edn6y.googlevideo.com/videoplayback?expire=1673603364&ei=xNTAY4SrHoHEgAfjtJ2ABA&ip=216.131.111.16&id=o-ALV9oeE-kSt0GJYloxDQUFS0-lazm3iJXniO5W91fr7K&itag=137&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278&source=youtube&requiressl=yes&spc=zIddbPQv-Yb9870n4trJvnzsghcGQPc&vprv=1&mime=video%2Fmp4&ns=0AdOakrbOCVX2XILj2KbjM0K&gir=yes&clen=25355990&dur=66.240&lmt=1668010099290553&keepalive=yes&fexp=24007246&c=WEB&txp=5319224&n=DeSQs5z9hjdFsQ&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cspc%2Cvprv%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&sig=AOq0QJ8wRQIhAP94Xr7KrhAMz9RhQj5xI4n5XTAh8aQWqmsQuSazafseAiAbH1VZ3oTpXAqQOrE2rZotz3bDPUEN-zJkXXVsaBQNZA%3D%3D&rm=sn-n02xgoxufvg3-2gb67l&req_id=3ad528a41a6fa3ee&cmsv=e&ipbypass=yes&redirect_counter=2&cm2rm=sn-2gber7l&cms_redirect=yes&mh=wr&mip=91.195.157.115&mm=34&mn=sn-4g5edn6y&ms=ltu&mt=1673581481&mv=m&mvi=2&pl=23&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRQIhAPEMc3FU0ReAC61EKp7CwAGy54Oz8U9yWODL87ImlCKeAiAEWcz4tVD5HXdy9lQPTnS3l3mlbSJYE9K_zRywQTZy3w%3D%3D" autoPlay muted loop></video>
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