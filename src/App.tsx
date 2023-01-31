import { useState, useEffect } from 'react'
import { useWallet } from "@suiet/wallet-kit";
import '@suiet/wallet-kit/style.css';
import './App.css'
import Nav from './components/Nav';
import MenuProvider from './components/MenuProvider';
import Welcome from './components/Welcome';
import axios from 'axios';
import Cookies from 'js-cookie';


function App() {
  // const menu =['Raffles', 'White List', 'Vote', 'Battle', 'Championship'];
  const menu =['Raffles', 'White List'];
  const [menuSelect, setMenuSelect] = useState('Raffles');
  const [token, setToken] = useState('');
  const [walletAdress, setWalletAdress] = useState('');
  const listMenu = menu.map((menu_el: string) => <button className='listMenu_El' onClick={handelMenuElement}>{menu_el}</button>);

  const wallet = useWallet();


  function getToken(suiwallet:any){
    axios.post('https://api.suiecosystem.top/api/authuser', {
          suiwallet
          // suiwallet: wallet.account.address
        })
          .then(function (response) {
            // console.log("set new token");
            
            Cookies.set('token', response.data.data.token);
            setToken(response.data.data.token);
          })
          .catch(console.log)
      }


  useEffect(() => {
    if (wallet.account?.address) {
      setWalletAdress(String(wallet.account?.address));
      Cookies.set('suiwallet', String(wallet.account?.address));

      if (!Cookies.get('token')) getToken(String(wallet.account?.address));

      else {
        const headers = { Authorization: `Bearer ${Cookies.get("token")}` };
        axios.get('https://api.suiecosystem.top/api/checkuser', { headers })
          .then((response) => { console.log(response.status); })
          .catch(() => { getToken(String(wallet.account?.address)) })
      }
    }
    // document.getElementsByClassName("menu")[0].children[0].classList.add("active_tab")
  }, [wallet.account?.address])

  // useEffect(() => {
  //   if (!wallet.connected) return;
  //   console.log('listen to all change event')
  //   const off = wallet.on('change', (...args) => {
  //     console.log('wallet changed', ...args)
  //   })
  //   return () => {
  //     off()
  //   }
  // }, [wallet.connected])

  // useEffect(() => {
  //   if (!wallet.connected) return;
  //   console.log('listen to chainChange event only')
  //   const off = wallet.on('chainChange', ({ chain }) => {
  //     console.log('chainChange', chain)
  //   })
  //   return () => {
  //     off()
  //   }
  // }, [wallet.connected])

  function handelMenuElement(e: any) {

    let foo = document.getElementsByClassName("menuEl")[0].children;
    for (var i = 0; i < foo.length; i++) foo[i].classList.remove("active_tab");
    e.currentTarget.classList.add("active_tab");

    setMenuSelect(e.target.innerText)
}

  return (
    <div className="App">
      {walletAdress ? <Nav suiwallet={walletAdress} /> : null}
      {token || Cookies.get('token') ?

        <div className="main">
          <div className="menu">
            <div className="menuEl">
              {listMenu}
            </div>
            <hr />
          </div>
          <MenuProvider menuEl={menuSelect}/>
        </div>
        : <Welcome />
      }
    </div>
  )
}

export default App