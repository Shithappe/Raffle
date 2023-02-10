import { useEffect, useState } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import Card_Completed from './Card_Completed';
import BattleCard from './BattleCard';
import ProjectCard from './ProjectCard';

function Battle() {
    const [data, setData] = useState([]);
    const [dataSoon, setDataSoon] = useState([]);
    const [tab, setRaffls] = useState('active');
    const [URL, setURL] = useState('https://api.suiecosystem.top/api/raffle/active');

    
    useEffect(()=>{
        let time = 1000;
        // if (Cookies.get("token")) time = 0

        setTimeout(() => {
            const headers = { Authorization: `Bearer ${Cookies.get("token")}` };
            
            axios.get(URL, { headers })
                .then((response)=>{
                    setData(response.data);
                })
            if (tab == 'active'){
                axios.get('https://api.suiecosystem.top/api/raffle/soon', { headers })
                .then((response)=>{
                    setDataSoon(response.data);
                })
            }
           }, time);
    }, [URL]);
    


    function handelCompleted(e: any) {
        setData([]);
        setRaffls(e.target.innerText.toLowerCase());
        setURL(`https://api.suiecosystem.top/api/raffle/${e.target.innerText.toLowerCase()}`);

        let foo = document.getElementsByClassName("tabs")[0].children;
        for (var i = 0; i < foo.length; i++) foo[i].classList.remove("active_tab");
        e.currentTarget.classList.add("active_tab");
    }


    const test_data = [
        {
            img: 'https://i.pinimg.com/564x/1b/77/ac/1b77ac2e284544ad1c67da4621f68118.jpg',
            logo: 'https://i.pinimg.com/564x/11/39/9f/11399f147a04bbca44b063c2094ced57.jpg',
            title: 'title_1',
            description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem amet non dolorem repellendus doloremque. Eius excepturi saepe sequi et animi.',
        },
        // {
        //     img: 'https://i.pinimg.com/564x/1b/77/ac/1b77ac2e284544ad1c67da4621f68118.jpg',
        //     logo: 'https://i.pinimg.com/564x/11/39/9f/11399f147a04bbca44b063c2094ced57.jpg',
        //     title: 'title_2',
        //     description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem amet non dolorem repellendus doloremque. Eius excepturi saepe sequi et animi.',
        // },
        // {
        //     img: 'https://i.pinimg.com/564x/1b/77/ac/1b77ac2e284544ad1c67da4621f68118.jpg',
        //     logo: 'https://i.pinimg.com/564x/11/39/9f/11399f147a04bbca44b063c2094ced57.jpg',
        //     title: 'title_3',
        //     description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem amet non dolorem repellendus doloremque. Eius excepturi saepe sequi et animi.',
        // },
        // {
        //     img: 'https://i.pinimg.com/564x/1b/77/ac/1b77ac2e284544ad1c67da4621f68118.jpg',
        //     logo: 'https://i.pinimg.com/564x/11/39/9f/11399f147a04bbca44b063c2094ced57.jpg',
        //     title: 'title_4',
        //     description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem amet non dolorem repellendus doloremque. Eius excepturi saepe sequi et animi.',
        // },
        // {
        //     img: 'https://i.pinimg.com/564x/1b/77/ac/1b77ac2e284544ad1c67da4621f68118.jpg',
        //     logo: 'https://i.pinimg.com/564x/11/39/9f/11399f147a04bbca44b063c2094ced57.jpg',
        //     title: 'title_5',
        //     description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem amet non dolorem repellendus doloremque. Eius excepturi saepe sequi et animi.',
        // },
    ]


    
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
                    {/* {data?.sort((a:any, b:any) => a.end_date > b.end_date ? 1 : -1).map((dataCard:any) => <Card_Active data={dataCard}/>)} */}
                    {test_data?.map((dataCard:any) => <BattleCard data={dataCard}/>)}
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

export default Battle