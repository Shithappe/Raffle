import { useState, useEffect } from 'react'
import './App.css'
import { useWallet } from "@suiet/wallet-kit";
import '@suiet/wallet-kit/style.css';
import Nav from './components/Nav';
import Tabs from './components/Tabs';
import Welcome from './components/WelcomeVideo';
import axios from 'axios';
import Cookies from 'js-cookie';


function App() {
  const [menu, setMenu] = useState(['Raffls']);
  const [token, setToken] = useState('');
  const [walletAdress, setWalletAdress] = useState('');
  const listMenu = menu.map((menu_el: string) => <button>{menu_el}</button>);

  const wallet = useWallet();


  useEffect(() => {
    console.log(document.getElementsByClassName('wkit-connected-button'));

    if (wallet.account?.address) {
      setWalletAdress(String(wallet.account?.address));
      Cookies.set('suiwallet', String(wallet.account?.address));

      if (!Cookies.get('token')) {

        axios.post('https://api.suiecosystem.top/api/authuser', {
          suiwallet: wallet.account.address
        })
          .then(function (response) {
            Cookies.set('token', response.data.data.token);
            setToken(response.data.data.token);
            console.log(response.data);

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
                console.log(response.data);
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


  return (
    <div className="App">
      {walletAdress ? <Nav suiwallet={walletAdress} /> : null}
      {token || Cookies.get('token') ?
        <div className="main">
          <div className="menu">
            {listMenu}
            <hr />
          </div>
          <Tabs />
        </div>
        : <Welcome />
      }
    </div>
  )
}

export default App

