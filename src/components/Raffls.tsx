import { useState, useEffect } from 'react';
import axios from 'axios';
import Card_Soon from './Card_Soon';
import Card_Active from './Card_Active';
import Card_Completed from './Card_Completed';
import Cookies from 'js-cookie';

function Raffls() {
    const [data, setData] = useState([]);
    const [dataSoon, setDataSoon] = useState([]);
    const [tab, setRaffls] = useState('active');
    const [URL, setURL] = useState('https://api1.suiecosystem.top/api/raffle/active');
    

    useEffect(()=>{
        // let time = 0;
        let time = 1000;
        if (Cookies.get("token")) time = 0;

        setTimeout(() => {
            const headers = { Authorization: `Bearer ${Cookies.get("token")}` };
            
            axios.get(URL, { headers })
                .then((response)=>{
                    
                    setData(response.data);
                })
            if (tab == 'active'){
                axios.get('https://api1.suiecosystem.top/api/raffle/soon', { headers })
                .then((response)=>{
                    setDataSoon(response.data);
                })
            }
           }, time);
    }, [URL]);
    


    function handelCompleted(e: any) {
        setData([]);
        setRaffls(e.target.innerText.toLowerCase());
        setURL(`https://api1.suiecosystem.top/api/raffle/${e.target.innerText.toLowerCase()}`);

        let foo = document.getElementsByClassName("tabs")[0].children;
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
                    {data?.sort((a:any, b:any) => a.end_date > b.end_date ? 1 : -1).map((dataCard:any) => <Card_Active data={dataCard}/>)}
                    {dataSoon?.map((dataCard:any) => <Card_Soon data={dataCard}/>)}
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

export default Raffls