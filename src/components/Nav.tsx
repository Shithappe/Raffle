import { useEffect, useState } from "react";
import { ConnectButton } from "@suiet/wallet-kit";
import '@suiet/wallet-kit/style.css';
import axios from "axios";
import Cookies from "js-cookie";
import ava from '../assets/ava.png';


const Nav = (suiwallet:any) => {
  const [discord_mode, setDiscord_mode] = useState(<div></div>);
  const [ch_view, setCh_view] = useState(false);
  // const [data_discord, setData_discord] = useState({username: '', avatar: ''});



  useEffect(()=>{
    if (suiwallet.suiwallet){
      setDiscord_mode(<button className="discord_button" onClick={auth_discord}>Connect Discord</button>);
    }

    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get('code');

    if (localStorage.getItem('discord_data')) {
      let items = JSON.parse(String(localStorage.getItem('discord_data')));
      setDiscord_mode(
        <div className="discord_block">
          {items.avatar ? <img src={`https://cdn.discordapp.com/avatars/${items.discord_id}/${items.avatar}`} /> : <img src={ava} alt={ava} />}
          
          <div className="discord_title">
          <h4>{items.username}</h4>
          <span>{`@${items.username}#${items.discriminator}`}</span>
          </div>
        </div>
      );
    }
    else{
      if (code)
      axios
        .get(`${import.meta.env.VITE_API_URL}callback2?code=${code}&suiwallet=${suiwallet.suiwallet}`)
        .then((response:any) => {
          
            // setData_discord(response.data);
            localStorage.setItem('discord_data', JSON.stringify(response.data));
            
            setDiscord_mode(
              <div className="discord_block">
                {response.data.avatar ? <img src={`https://cdn.discordapp.com/avatars/${response.data.discord_id}/${response.data.avatar}`} /> : <img src={ava} alt={ava} />}
                <div className="discord_title">
                <h4>{response.data.username}</h4>
                <span>{`@${response.data.username}#${response.data.discriminator}`}</span>
                </div>
              </div>
            );
        })
        .catch(console.log);
    }

  }, [])

  function auth_discord() {
    const redirect_uri = 'https://raffles.suiecosystem.top/';
    location.href = `https://discord.com/oauth2/authorize?client_id=1033883579278688267&redirect_uri=${redirect_uri}&response_type=code&scope=identify%20email%20guilds&prompt=none`;
  }

  function logout(){
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }

    window.localStorage.clear();


    location.href = 'https://raffles.suiecosystem.top/';
  }

  function hendleCh() {
    setCh_view(!ch_view);

    // if (ch_view){
    //   document.getElementsByClassName('main')[0].style = 'display: none;';
    //   document.getElementsByClassName('championship')[0].style = 'display: flex;';
    // }
    // else{
    //   document.getElementsByClassName('championship')[0].style = 'display: none;';
    //   document.getElementsByClassName('main')[0].style = 'display: flex;';
    // }
  }


  return (
    <nav>
      <div className="nav_title">
        <h1><span>Sui</span>Raffles</h1>
        <p>beta</p>
        {/* <button onClick={hendleCh}>ch</button> */}
      </div>

      <div className="buttons_nav">
        { (Cookies.get('token')) && discord_mode }
          <ConnectButton label="Connect Wallet"/>

        <button className="logout_button discord_button" onClick={logout}>Logout</button>
      </div>
    </nav>
  )
}

export default Nav
