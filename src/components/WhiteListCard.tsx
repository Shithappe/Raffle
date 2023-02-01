import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import twitter_logo from "../assets/twitter-social-media-network-svgrepo-com.png";
import discord_logo from "../assets/discord.png";


function WhiteListCard({ data }: { data: any }) {
    const [blockCard, setBlockCard] = useState(false);
    const [active, setActive] = useState(true);
    const [cardClass, setCardClass] = useState('card');

    function hendleJoin(e: any) {
        if (!localStorage.getItem('discord_data')) {
          setBlockCard(true);
          e.target.style.backgroundColor = 'red';
          setTimeout(() => {
            e.target.style.backgroundColor = '#2b2b2b';
            setBlockCard(false);
          }, 5000);
        }
        else {
          axios.post('https://api.suiecosystem.top/api/events/start',
            {
              suiwallet: Cookies.get('suiwallet'),
              raffle_id: data.data.id
            },
            {
              headers: { Authorization: `Bearer ${Cookies.get("token")}` }
            })
            .then(() => {
              // console.log(response.data);
              e.target.innerHTML = 'Joined';
              e.target.style.backgroundColor = 'green';
            })
            .catch(console.log)
        }
      }
    
    
    return (
      <div className="main_card">
      <div className='card'>
        {blockCard ? <div className="blockedCard"><h1>You need</h1><h1>auth with</h1><h1 id="ls">Discord</h1></div>
          :
          <div>
            <div className="image_card">
              <img className="big_img" src={data.img} alt="" />
              <img className="small_img" src={data.logo} alt="" />
              <div className="social">
                <a href='#' target="_blank"><img src={discord_logo} alt="" /></a>
                <a href='#' target="_blank"><img id="twitter_logo" src={twitter_logo} alt="" /></a>
              </div>

            </div>
            <div className="active_card content_card ">
              <div className="title_card">
                {/* <span>Public</span> */}
                <h2>{data.title}</h2>
              </div>
              <span>{data.description}</span>
            </div>
          </div>
        }

        <button className="join_button" onClick={hendleJoin}>Join to White List</button>
      </div>
    </div>    )
}

export default WhiteListCard