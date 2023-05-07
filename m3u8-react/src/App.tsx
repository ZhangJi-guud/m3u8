import React, { useState, useEffect } from 'react';
import PlayerYouTubeDirectly from './player/playerYouTubeDirectly'
import axios from 'axios';
import './App.css';


function App() {

  let defaultURL = "https://www.ganjing.com/zh-CN/video/1fjl7ane6q61FURYeoDjgsGaf1lf1c?playlistID=1fjl7emkv9o6SCgnv2aBuH51l30p";
  //let videoUrl = "https://www.youtube.com/watch?v=E0CvY6GLy3g";
  //let ganJingm3u8 = "https://media4-us-west.cloudokyo.cloud/video/v5/5b/e1/4e/5be14e89-1c4d-4108-a0b4-899f3e3ab089/master.m3u8";

  const [ganJingUrl, setGanJingUrl] = useState(defaultURL);
  const [ganJingUrlText, setGanJingUrlText] = useState(defaultURL);
  const [ganJingUrlM3u8, setGanJingUrllM3u8] = useState();
  const [view, setView] = useState(0);

  let url1 = 'http://localhost:3001/app/getM3u8';
  //let url2 = 'http://localhost:3001/app/getM3u8Body/master.m3u8';
  useEffect(() => {
    if (ganJingUrl) {
      axios.post(url1, {
        ganJingUrl
      })
        .then(function (response) {
          console.log(response, response.data?.m3u8Url);
          setGanJingUrllM3u8(response.data?.m3u8Url);
        })
        .catch(function (error) {
          console.log(error);
          //setGanJingUrllM3u8("http://127.0.0.1:8080/index.m3u8");
        });
    }
  }, [ganJingUrl]);

  const handleUrlChange = (e: any) => {
    console.log("e.target.value",e.target.value);
    setGanJingUrlText(e.target.value);
  };

  const handlePlayClick = (e: any) => {
    console.log("e.target.value",e.target.value);
    setGanJingUrl(ganJingUrlText);
  };

  return (
    <div className="App">
      <br/>
      <input type="text" name="ganJingUrlText" value={ganJingUrlText} onChange={handleUrlChange} size={200}/>
      <br/>
      <button onClick={ handlePlayClick }>Play</button>

      {ganJingUrlM3u8 && <PlayerYouTubeDirectly videoUrl={ganJingUrlM3u8}>
      </PlayerYouTubeDirectly>}

    </div>
  );
}

export default App;
