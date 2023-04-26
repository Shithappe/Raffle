import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import twitter_logo from "../assets/twitter-social-media-network-svgrepo-com.png";
import discord_logo from "../assets/discord.png";
import ProjectCard from "./ProjectCard";

interface BattleCardProps {
  data: any;
  disable: boolean;
};


function BattleCard({ data, disable }: BattleCardProps) {
  const [blockCard, setBlockCard] = useState(false);
  const [ProjectData, setProjectData] = useState<any[]>([]);
  
  const [selectedProject, setSelectedProject] = useState<{[key: string]: any}>({});    

  
  const fetchData = async () => {
    const results = [];

    try {
      const arr = JSON.parse(data.res);
      const all_voted = [];
      const empty = [];

      if (data.join){
        for (let i = 0; i < data.all_voted.length; i++) all_voted.push(data.all_voted[i].res);

        for (let i = 0; i < arr.length; i++) {
          if (all_voted.includes(arr[i])) empty.push({id: arr[i], percent: data.all_voted[all_voted.indexOf(arr[i])].percent});
          else empty.push(null);
        }
      }
        

      for (let i = 0; i < arr.length; i++) {
        const response = await axios.get(`https://old.suiecosystem.top/wp-json/api/get_custom_by_id/${arr[i]}`);

        let temp = response.data;
        if (data.join) empty[i] ? temp.percent = empty[i]?.percent : temp.percent = 0;
        results.push(temp);
      }
      setProjectData(results);
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    
    fetchData();    
    
  }, []);


  function hendleJoin(e: any) {
    
    if (!localStorage.getItem('discord_data')) {
      setBlockCard(true);
      e.target.style.backgroundColor = 'red';
      setTimeout(() => {
        e.target.style.backgroundColor = '#2b2b2b';
        setBlockCard(false);
      }, 5000);
    }
    else
    axios.post(`${import.meta.env.VITE_API_URL}resbats/sendvoice`,
        {
          battle_id: `${data.id}`,
          res: `${selectedProject.id}`
        },
        {
          headers: { 
            Authorization: `Bearer ${Cookies.get("token")}`,
            'Content-Type': 'application/json'
           }
        })
        .then((response) => {
          data.join = true;
          data.all_voted = response.data;
          
          fetchData();
          
          e.target.innerHTML = 'Voted';
          e.target.style.backgroundColor = 'green';
        })
        .catch(console.log)
  }


  return (
      <div className='battle card'>
        {blockCard ? <div className="blockedCard"><h1>You need</h1><h1>auth with</h1><h1 id="ls">Discord</h1></div>
          :
          <div>
            <div className="image_card">
              <img className="big_img" src={data.img} alt="" />
              <div className="social">
                <a href='#' target="_blank"><img src={discord_logo} alt="" /></a>
                <a href='#' target="_blank"><img id="twitter_logo" src={twitter_logo} alt="" /></a>
              </div>

            </div>
            <div className="battle_content_card">
              <div className="title_card">
                <span>Public</span>
                <h2>{data.title}</h2>
              </div>
              <span>{data.description}</span>
              <div className="vote">
              {ProjectData.map((item:any)=> <ProjectCard setSelectedProject={setSelectedProject} data={item} />)}
              {/* {ProjectData.map((item:any)=> <ProjectCard setSelectedProject={!disable && setSelectedProject} data={item} />)} */}
          </div>
            </div>
          </div>
        }

        { data.join 
          ? <button className="join_button" style={{backgroundColor: 'green'}} onClick={hendleJoin} disabled >Voted</button>
          : <button className="join_button" onClick={hendleJoin} disabled={!selectedProject || disable}>{data.join === undefined ? "Finish" : "Vote"}</button>
        }
        
      </div >
  )
}

export default BattleCard