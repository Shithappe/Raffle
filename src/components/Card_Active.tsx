import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import twitter_logo from "../assets/twitter-social-media-network-svgrepo-com.png";
import discord_logo from "../assets/discord.png";

function Card_Active(data:any) {
  const [blockCard, setBlockCard] = useState(false);
  const [active, setActive] = useState(true);
  const [cardClass, setCardClass] = useState('card');  
  
  // data.data.status = '1'
  const name_button = data.data.status == '0' ? 'Join' : 'See winers';


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
    if (data.data.status != 0) {
      setActive(false);
      setCardClass('card inactive_card'); 
    }
}, []);



function hendleJoin(e:any){
  if (!localStorage.getItem('discord_data')) {
    setBlockCard(true);
    e.target.style.backgroundColor = 'red';
    setTimeout(() => {
      e.target.style.backgroundColor = '#2b2b2b';
      setBlockCard(false);
    }, 5000);
  }
  else{
    e.target.innerHTML = 'Joined';
    e.target.style.backgroundColor = 'green';
    axios.post('https://api.suiecosystem.top/api/events/start', 
    {
      suiwallet: Cookies.get('suiwallet'),
      raffle_id: data.data.id
    },
    {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` }
    })
    .then((response)=>{
      console.log(response.data);
    })
    .catch(console.log)
  }
}
  
  return (
    <div className="main_card">
      <div className={cardClass}>
        {blockCard ? <div className="blockedCard"><h1>You need</h1><h1>auth with</h1><h1 id="ls">Discord</h1></div>
        :
        <div>
           <div className="image_card">
          <img className="big_img" src={data.data.img} alt="" />
          <img className="small_img" src={data.data.logo} alt="" />
        </div>
        <div className="content_card">
        <div className="title_card">
          <span>Public</span>
          <h2>{data.data.title}</h2>
        </div>
          <span>{data.data.description}</span>

          <span>Amount: {data.data.amount}</span>
          <span>Will be winner: {data.data.amount}</span>
          <span>Reward type: {data.data.gift_type}</span>
          <div className="social">
            <a href={data.data.twitter}><img id="twitter_logo" src={twitter_logo} alt="" /></a>
            <a href={data.data.discord}><img src={discord_logo} alt="" /></a>
          </div>
          <div className="time">
              <div className="timer" role="timer">
              <div className="box">
                    <p id="day">{days < 10 ? "0" + days : days}</p>
                    <span className="text">Days</span>
                  </div>

                  <div className="box">
                    <p id="hour">{hours < 10 ? "0" + hours : hours}</p>
                    <span className="text">Hours</span>
                  </div>
                  <div className="box">
                    <p id="minute">{minutes < 10 ? "0" + minutes : minutes}</p>
                    <span className="text">Minutes</span>
                  </div>
                  <div className="box">
                    <p id="second">{seconds < 10 ? "0" + seconds : seconds}</p>
                    <span className="text">Seconds</span>
                  </div>
              </div>
          </div>
      </div>
        </div>
        }
        
        
      <button className="join_button" disabled={!active} onClick={hendleJoin}>{name_button}</button>
    </div>
    </div>
  )
}

export default Card_Active