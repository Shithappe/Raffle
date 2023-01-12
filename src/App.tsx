import { useState, useEffect } from 'react'
import './App.css'
import { useWallet } from "@suiet/wallet-kit";
import '@suiet/wallet-kit/style.css';
import Nav from './components/Nav';
import Tabs from './components/Tabs';
import axios from 'axios';
import Cookies from 'js-cookie';


function App() {  
  const [menu, setMenu] = useState(['Raffls']);
  const [token, setToken] = useState('');
  const [walletAdress, setWalletAdress] = useState('');
  const listMenu = menu.map((menu_el: string) => <button>{menu_el}</button>);

  const wallet = useWallet();  

  
  useEffect(() => {
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
      <div className="main">
        <div className="menu">
          { listMenu }
          <hr />
        </div>
        <Tabs/>
      </div>
    </div>
  )
}

export default App

