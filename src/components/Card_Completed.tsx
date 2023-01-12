import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

function Card_Completed(data:any) {
  const [active, setActive] = useState(true);
  const [winners, setWinners] = useState([]);
  // const [cardClass, setCardClass] = useState('card');  
  
  data.data.status = '1'
  const name_button = data.data.status == '0' ? 'Join' : 'See winers';


  // console.log(data.data);
  
  
  
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  
  const deadline = data.data.end_date;

    const getTime = (deadline:any) => {
      const time = Date.parse(deadline) - Date.now();    

      setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
      setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
      setMinutes(Math.floor((time / 1000 / 60) % 60));
      setSeconds(Math.floor((time / 1000) % 60));
  };

  useEffect(() => {
    const interval = setInterval(() => getTime(deadline), 1000);

    return () => clearInterval(interval);
  }, []);
  
  
  useEffect(()=>{
    if (data.data.status != 0) {
      setActive(false);
      // setCardClass('card inactive_card'); 
    }
}, []);

function hendleJoin(e:any){
  e.target.parentNode.parentNode.style.transform = "perspective(600px) rotateY(-180deg)";
  e.target.parentNode.parentNode.parentNode.lastChild.style.transform = "perspective(600px) rotateY(0deg)";

  axios.get('https://jsonplaceholder.typicode.com/users')
  .then((response)=>{
    setWinners(response.data)
  })
  .catch(console.log)
}

function handleBack(e:any){
  e.target.parentNode.parentNode.parentNode.firstChild.style.transform = "perspective(600px) rotateY(0deg)";
  e.target.parentNode.parentNode.style.transform = "perspective(600px) rotateY(180deg)";
}
  
  return (
    <div className="main_card">
      {/* front */}
      <div className="front">
      <div className="card">
        <div className="image_card">
          <img className="big_img" src="https://pbs.twimg.com/profile_banners/1377276171075739652/1666059287/1500x500" alt="" />
          <img className="small_img" src="https://pbs.twimg.com/profile_images/1565733504826150912/WlP72ukv_400x400.jpg" alt="" />
        </div>
        <div className="content_card">
          <div className="title_card">
            <span>Public</span>
            <h2>{data.data.title}</h2>
          </div>
            <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. </span>

            <span>Amount: {data.data.amount}</span>
            <span>Will be winner: {data.data.amount}</span>

        </div>
      <button className="join_button" onClick={hendleJoin}>{name_button}</button>
    </div>
      </div>
      <div className="back">
        <div className="back-content">
          <h2>Winners</h2>
          <button className="arrow left" onClick={handleBack}>
            back
          </button>
          <div className="winners">
                      {winners?.map((winner:any) => <div><p>{winner.name}</p><p>{winner.username}</p></div>)}
          </div>
        </div>
      </div>

    </div>
  )
}

export default Card_Completed