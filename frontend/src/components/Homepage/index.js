import React from 'react';
import {useHistory } from 'react-router-dom';
import '../CSS/Homepage.css'


const Homepage = () => {
  const history = useHistory();

  const redirect = () => {
    history.push('/spots')
  };

return (
    <div className="homeImageCard">
       <div className="ImageCard">
          <img className="image" src='https://i3.lensdump.com/i/16KtJA.jpg' alt='beach splash page background'></img>
             <div className="imageOverlay">
              <p>Need a Beach Vacation?</p>
               <button onClick={redirect}><p>Discover</p></button>
             </div>
           </div>
       </div>
  )
}

export default Homepage;
