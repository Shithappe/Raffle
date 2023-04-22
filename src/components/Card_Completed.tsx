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
  axios.get(`https://api1.suiecosystem.top/api/raffle/winners/${data.data.id}`, { headers })
  .then((response)=>{
    setWinners(response.data);
  })
  .catch(console.log)
}

function handleBack(e:any){
  e.target.parentNode.parentNode.parentNode.firstChild.style.transform = "perspective(600px) rotateY(0deg)";
  e.target.parentNode.parentNode.style.transform = "perspective(600px) rotateY(180deg)";
}
  
  return (
    <div className="main_card_С">
      {/* front */}
      <div className="front">
      <div className={cardClass}>
        <div className="image_card">
        <img className="big_img" src={data.data.img} alt="" />
          <img className="small_img" src={data.data.logo} alt="" />
          <div className="social">
              <a href={data.data.twitter} target="_blank"><img id="twitter_logo" src={twitter_logo} alt="" /></a>
              <a href={data.data.discord} target="_blank"><img src={discord_logo} alt="" /></a>
            </div>
        </div>
        <div className="content_card">
          <div className="title_card">
            <span>Public</span>
            <h2>{data.data.title}</h2>
          </div>
            <span>{data.data.description}</span>
            <span>Amount: {data.data.amount} {data.data.gift_type}</span>
            {/* <span>Will be winner: {data.data.amount}</span> */}
            {/* <span>Reward type: {data.data.gift_type}</span> */}
            

        </div>
        {!data.data.guild_id ?
          <button className="join_button" disabled={!active} onClick={hendleJoin}>{name_button}</button>
        : <div></div>  
      }
      
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