import twitter_logo from "../assets/twitter-social-media-network-svgrepo-com.png";
import discord_logo from "../assets/discord.png";

function Card_Soon(data:any) {
  const getTime = (deadline:any) => {
    const time = Date.parse(deadline) - Date.now();    
    
    // console.log(Math.floor(time / (1000 * 60 * 60 * 24)));
    if (Math.floor(time / (1000 * 60 * 60 * 24)) > 30) return "Coming soon"
    else return deadline;
  };
      
      return (
        <div className="main_card_С">
      <div className="front">
      <div className='card inactive_card'>
        <div className="image_card">
        <img className="big_img" src={data.data.img} alt="" />
          <img className="small_img" src={data.data.logo} alt="" />
          <div className="social">
              <a href={data.data.twitter} target="_blank"><img id="twitter_logo" src={twitter_logo} alt="" /></a>
              <a href={data.data.discord} target="_blank"><img src={discord_logo} alt="" /></a>
            </div>
        </div>
        <div className="content_card">
          <div className="title_card">
            <span>Public</span>
            <h2>{data.data.title}</h2>
          </div>
            <span>{data.data.description}</span>
            <div className="adding_info_card">
              <span>Start date: {getTime(data.data.start_date)}</span>
              <span><b>Amount: {data.data.amount} {data.data.gift_type}</b></span>
            </div>
        </div>

      <button className="join_button" disabled>Сoming soon</button>
    </div>
      </div>
    </div>
  )
}

export default Card_Soon