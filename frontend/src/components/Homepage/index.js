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
          <img className="image" src='https://images.pexels.com/photos/5232185/pexels-photo-5232185.jpeg'></img>
             <div className="imageOverlay">
              <p>Need a Beach Vacation?</p>
               <button onClick={redirect}><p>Discover</p></button>
             </div>
           </div>
       </div>
  )
}

export default Homepage;
