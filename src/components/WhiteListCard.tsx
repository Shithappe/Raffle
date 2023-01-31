import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";

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
            <div className={cardClass}>
                {blockCard ? <div className="blockedCard"><h1>You need</h1><h1>auth with</h1><h1 id="ls">Discord</h1></div>
                    :
                    <div>
                        <div className="content_card_wl ">
                            <div className="title_card">
                                <span>Public</span>
                                <h2>{data.title}</h2>
                            </div>
                            <span>{data.description}</span>
                        </div>
                    </div>
                }
                <button className="join_button" disabled={!active} onClick={hendleJoin}>Connect to White list (WL)</button>
            </div>
        </div>

    )
}

export default WhiteListCard