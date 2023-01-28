import { useState, useEffect } from 'react'
import './App.css'
import { useWallet } from "@suiet/wallet-kit";
import '@suiet/wallet-kit/style.css';
import Nav from './components/Nav';
import MenuProvider from './components/MenuProvider';
import Welcome from './components/Welcome';
import axios from 'axios';
import Cookies from 'js-cookie';


function App() {
  const menu =['Raffls', 'White List', 'Championship'];
  const [menuSelect, setMenuSelect] = useState('Raffls');
  const [token, setToken] = useState('');
  const [walletAdress, setWalletAdress] = useState('');
  const listMenu = menu.map((menu_el: string) => <button onClick={handelMenuElement}>{menu_el}</button>);

  const wallet = useWallet();


  useEffect(() => {
    if (wallet.account?.address) {
      document.getElementsByClassName("menu")[0].children[0].classList.add("active_tab")
      setWalletAdress(String(wallet.account?.address));
      Cookies.set('suiwallet', String(wallet.account?.address));

      if (!Cookies.get('token')) {

        axios.post('https://api.suiecosystem.top/api/authuser', {
          suiwallet: wallet.account.address
        })
          .then(function (response) {
            Cookies.set('token', response.data.data.token);
            setToken(response.data.data.token);
          })
          .catch(console.log)
      }
      else{
        axios.post('https://api.suiecosystem.top/api/authuser', {
              suiwallet: wallet.account?.address
            })
              .then(function (response) {
                Cookies.set('token', response.data.data.token);
                setToken(response.data.data.token);
              })
              .catch(console.log)
        }
      // else {
      //   const headers = { Authorization: `Bearer ${Cookies.get("token")}` };
      //   axios.get('https://api.suiecosystem.top/api/checkuser', { headers })
      //     .then((response) => {
      //       console.log(response.status);
      //     })
      //     .catch(() => {
      //       axios.post('https://api.suiecosystem.top/api/authuser', {
      //         suiwallet: wallet.account?.address
      //       })
      //         .then(function (response) {
      //           Cookies.set('token', response.data.data.token);
      //           setToken(response.data.data.token);
      //           console.log(response.data);
      //         })
      //         .catch(console.log)
      //     })
      // }
    }
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

    let foo = document.getElementsByClassName("menu")[0].children;
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
            {listMenu}
            <hr />
          </div>
          <MenuProvider menuEl={menuSelect}/>
          {/* <Rafflss /> */}
        </div>
        : <Welcome />
      }
    </div>
  )
}

export default App

