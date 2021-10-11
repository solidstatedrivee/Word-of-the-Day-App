import './App.css';
import React from 'react';
import Content from './Content';
import Axios from 'axios';
import { useState, useEffect } from 'react';

function App() {

  const unsplashAccessKey = 'sK64f1nD7TO0SF_x9V1JprzeqhkfyVizHY9FCPqFeOo';
  const unsplashSecretKey = 'jwSsbdj5mD6_H9D5Ce0nig3VjDusyitZmt5NobxQM-o';
  const collectionID = '1459961';

  let unsplashRequestURL = `https://api.unsplash.com/collections/${collectionID}/photos?client_id=${unsplashAccessKey}`;

  const [dailyPhoto, setDailyPhoto] = useState("");

  useEffect(() => {
    (async function getPhotoOfTheDay() {
      await Axios.get(unsplashRequestURL).then(res => {
        console.log(res.data[0].urls.full);
        let fullSizeURL = res.data[0].urls.full;
        setDailyPhoto(fullSizeURL);
      }).catch(err => {
        alert(err);
      })
    })();
  })

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <section className="app-container" style={{ backgroundImage: `url("${dailyPhoto}")` }}>
        <h1 className="app-title">word of the day app</h1>
        <Content />
      </section>
    </div>
  );
}
export default App;
