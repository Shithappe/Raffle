import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import twitter_logo from "../assets/twitter-social-media-network-svgrepo-com.png";
import discord_logo from "../assets/discord.png";

function Card_Completed(data:any) {
  const [active, setActive] = useState(true);
  const [winners, setWinners] = useState([]);
  const [cardClass, setCardClass] = useState('card');  
  
  const name_button = data.data.status == '0' ? 'Calculation of results...' : 'See winners';


  // console.log(data.data);
  
  
  
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  
  const deadline = data.data.end_date;

    const getTime = (deadline:any) => {
      const time = Date.parse(deadline) - Date.now();    

      setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
      setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
      setMinutes(Math.floor((time / 1000 / 60) % 60));
      setSeconds(Math.floor((time / 1000) % 60));
  };

  useEffect(() => {
    const interval = setInterval(() => getTime(deadline), 1000);

    return () => clearInterval(interval);
  }, []);
  
  
  useEffect(()=>{
    if (data.data.status == 0) {
      setActive(false);
      setCardClass('card inactive_card'); 
    }
}, []);

function hendleJoin(e:any){
  e.target.parentNode.parentNode.style.transform = "perspective(600px) rotateY(-180deg)";
  e.target.parentNode.parentNode.parentNode.lastChild.style.transform = "perspective(600px) rotateY(0deg)";


  const headers = { Authorization: `Bearer ${Cookies.get("token")}` };
  axios.get(`https://api.suiecosystem.top/api/raffle/winners/${data.data.id}`, { headers })
  .then((response)=>{
    console.log(response.data);
    
    setWinners(response.data)
  })
  .catch(console.log)
}

function handleBack(e:any){
  e.target.parentNode.parentNode.parentNode.firstChild.style.transform = "perspective(600px) rotateY(0deg)";
  e.target.parentNode.parentNode.style.transform = "perspective(600px) rotateY(180deg)";
}
  
  return (
    <div className="main_card">
      {/* front */}
      <div className="front">
      <div className={cardClass}>
        <div className="image_card">
          <img className="big_img" src="https://pbs.twimg.com/profile_banners/1377276171075739652/1666059287/1500x500" alt="" />
          <img className="small_img" src="https://pbs.twimg.com/profile_images/1565733504826150912/WlP72ukv_400x400.jpg" alt="" />
        </div>
        <div className="content_card">
          <div className="title_card">
            <span>Public</span>
            <h2>{data.data.title}</h2>
          </div>
            <span>{data.data.description}</span>
            <span>Amount: {data.data.amount}</span>
            <span>Will be winner: {data.data.amount}</span>
            {/* <span>Status: {data.data.status}</span> */}
            <div className="social">
              <a href={data.data.twitter}><img id="twitter_logo" src={twitter_logo} alt="" /></a>
              <a href={data.data.discord}><img src={discord_logo} alt="" /></a>
            </div>

        </div>
      <button className="join_button" disabled={!active} onClick={hendleJoin}>{name_button}</button>
    </div>
      </div>
      <div className="back">
        <div className="back-content">
          <h2>Winners</h2>
          <button className="arrow left" onClick={handleBack}>Back</button>
          <div className="winners">
                      {winners?.map((winner:any) => <div className="winner"><span>{winner}</span></div>)}
          </div>
        </div>
      </div>

    </div>
  )
}

export default Card_Completed