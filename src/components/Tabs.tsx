import { useState, useEffect } from 'react';
import axios from 'axios';
import Card_Active from './Card_Active';
import Card_Completed from './Card_Completed';
import Cookies from 'js-cookie';

function Tabs() {
    const [data, setData] = useState([]);
    const [tab, setTab] = useState('active');
    const [URL, setURL] = useState('https://api.suiecosystem.top/api/raffle/active');
    

    useEffect(()=>{
        let time = 1000;
        if (Cookies.get("token")) time = 0

        setTimeout(() => {
            const headers = { Authorization: `Bearer ${Cookies.get("token")}` };
            
            axios.get(URL, { headers })
                .then((response)=>{
                    setData(response.data);
                })
           }, time);
    }, [URL]);
    


    function handelCompleted(e: any) {
        setData([]);
        setTab(e.target.innerText.toLowerCase());
        setURL(`https://api.suiecosystem.top/api/raffle/${e.target.innerText.toLowerCase()}`);

        let foo = document.querySelectorAll("button"); // можно брать детей родителя?
        for (var i = 0; i < foo.length; i++) foo[i].classList.remove("active_tab");
        e.currentTarget.classList.add("active_tab");
    }

  return (
    <div className="tabs_main">
        <div className="tabs">
            <button id='active_tab' className="tab active_tab" onClick={handelCompleted}>Active</button>
            <button id='completed_tab' className="tab" onClick={handelCompleted}>Completed</button>
        </div>
        <div className="content">

            { tab == 'active' 
                ? 
                <div className="cards">
                    {data?.map((dataCard:any) => <Card_Active data={dataCard}/>)}
                </div>
                :
                <div className="cards">
                    {data?.map((dataCard:any) => <Card_Completed data={dataCard}/>)}
                </div>
            }

        </div>
    </div>
  )
}

export default Tabs