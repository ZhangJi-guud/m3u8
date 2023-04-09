import React from 'react';
import PlayerYouTubeDirectly from './player/playerYouTubeDirectly'
import './App.css';


function App() {

  let videoUrl = "https://www.youtube.com/watch?v=E0CvY6GLy3g";

  let ganjingUrl = "https://www.ganjing.com/zh-CN/video/1fjl7ane6q61FURYeoDjgsGaf1lf1c?playlistID=1fjl7emkv9o6SCgnv2aBuH51l30p";

  let ganJingm3u8 = "https://media4-us-west.cloudokyo.cloud/video/v5/5b/e1/4e/5be14e89-1c4d-4108-a0b4-899f3e3ab089/master.m3u8";

  return (
    <div className="App">
    Play ganjingworld m3u8:
    <PlayerYouTubeDirectly videoUrl={ganJingm3u8}>
    </PlayerYouTubeDirectly>
      Play ganjingworld:
      {false && <PlayerYouTubeDirectly videoUrl={ganjingUrl}>
      </PlayerYouTubeDirectly> }

      Play Youtube:
      {false && <PlayerYouTubeDirectly videoUrl={videoUrl}>
      </PlayerYouTubeDirectly>}
    </div>
  );
}

export default App;
