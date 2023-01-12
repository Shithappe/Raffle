import { useEffect, useState } from "react";
import { ConnectButton } from "@suiet/wallet-kit";
import '@suiet/wallet-kit/style.css';
import axios from "axios";
import Cookies from "js-cookie";
import ava from '../assets/ava.png';


const Nav = (suiwallet:any) => {
  const [discord_mode, setDiscord_mode] = useState(<div></div>);
  // const [data_discord, setData_discord] = useState({username: '', avatar: ''});



  useEffect(()=>{
    if (suiwallet.suiwallet){
      setDiscord_mode(<button className="discord_button" onClick={auth_discord}>Discord</button>);
    }

    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get('code');

    if (localStorage.getItem('discord_data')) {
      let items = JSON.parse(String(localStorage.getItem('discord_data')));
      setDiscord_mode(
        <div className="discord_block">
          <img src={ava} alt={ava} />
          <div className="discord_title">
          <h4>{items.username}</h4>
          <span>{items.email}</span>
          </div>
        </div>
      );
    }
    else{
      if (code)
      axios
        .get(`http://api.suiecosystem.top/api/callback2?code=${code}&suiwallet=${suiwallet.suiwallet}`)
        .then((response) => {
            // setData_discord(response.data);
            localStorage.setItem('discord_data', JSON.stringify(response.data));
            
            setDiscord_mode(
              <div className="discord_block">
                <img src={ava} alt={ava} />
                <div className="discord_title">
                <h4>{response.data.username}</h4>
                <span>{response.data.email}</span>
                </div>
              </div>
            );
        })
        .catch(console.log);
    }

  }, [])

  function auth_discord() {
    location.href = 'https://discord.com/oauth2/authorize?client_id=1033883579278688267&redirect_uri=http://127.0.0.1:5173/&response_type=code&scope=identify%20email%20guilds&prompt=none';
  }


  return (
    <nav>
      <div className="nav_title">
      <h1>Cool name</h1>
      </div>
      <div className="buttons_nav">
        { (Cookies.get('token')) ? discord_mode : null }
      <ConnectButton label="Connect Wallet"/>
      </div>
    </nav>
  )
}

export default Nav
