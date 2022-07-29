import React from 'react';
import {useHistory } from 'react-router-dom';
import './Homepage.css'


const Homepage = () => {
  const history = useHistory();

  const redirect = () => {
    history.push('/spots')
  };

return (
  // <main>
    <div className="homeImageCard">
       <div className="ImageCard">
          <img className="image" src='https://i.imgur.com/vSe9cmD.jpeg'></img>
             <div className="imageOverlay">
              <p></p>
               <button onClick={redirect}><p>Discover</p></button>
             </div>
           </div>
       </div>
    // </main>
  )
}

export default Homepage;
