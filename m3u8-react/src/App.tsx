import React from 'react';
import PlayerYouTubeDirectly from './player/playerYouTubeDirectly'
import './App.css';


function App() {

  let videoUrl = "https://www.youtube.com/watch?v=E0CvY6GLy3g";

  return (
    <div className="App">
      <PlayerYouTubeDirectly videoUrl={videoUrl}>
      </PlayerYouTubeDirectly>
    </div>
  );
}

export default App;
