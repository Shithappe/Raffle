import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import twitter_logo from "../assets/twitter-social-media-network-svgrepo-com.png";
import discord_logo from "../assets/discord.png";
import ProjectCard from "./ProjectCard";


function BattleCard({ data }: { data: any }) {
  const [blockCard, setBlockCard] = useState(false);
  const [ProjectData, setProjectData] = useState([]);
  
  const [selectedProject, setSelectedProject] = useState({});



  useEffect(()=>{
    axios.get('https://old.suiecosystem.top/wp-json/api/get_project_by_slug_pagination/all/1/4')
    .then((response)=>setProjectData(response.data))
    .catch(console.log)
  }, [])

  function hendleJoin(e: any) {
    console.log(selectedProject)
    
    // if (!localStorage.getItem('discord_data')) {
    //   setBlockCard(true);
    //   e.target.style.backgroundColor = 'red';
    //   setTimeout(() => {
    //     e.target.style.backgroundColor = '#2b2b2b';
    //     setBlockCard(false);
    //   }, 5000);
    // }
    // else
    //  setModalActive(true);
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
              {ProjectData.map((item:any)=> <ProjectCard setSelectedProject={setSelectedProject} data={item}/>)}
          </div>
            </div>
          </div>
        }

        {/* <Modal active={modalActive} setActive={setModalActive}/> */}
        <button className="join_button" onClick={hendleJoin} disabled={!selectedProject}>Vote</button>
      </div >
  )
}

export default BattleCard