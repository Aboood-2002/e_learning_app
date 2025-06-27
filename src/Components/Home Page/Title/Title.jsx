import React from 'react';
import './Title.css';
import Collage from '../../../Assets/collage.png';
import K from '../../../Assets/205K.png';
import user from '../../../Assets/user.png';
import digram from '../../../Assets/digram.png';
import ellipse from '../../../Assets/ellipse.png';
import { useNavigate } from 'react-router-dom'; 

const Title = () => {
  const navigate = useNavigate()
  return (
    <div className='Title'>
      {/* Background image now gets its own class */}
      <img src={Collage} alt="Background" className="background-img" />
      
      <div className="study">
        <div className="init"><h1><span>Studying</span> Online is now much easier</h1>
        <p>We provide you with everything you need to show off your creativity</p></div>
        <button className='join' onClick={() => navigate(`/register`)}>Join for free</button>
      </div>
      
      <div className="featurs">
        <div className="K">
          <img src={K} alt="205K" />
          <div className="user">
            <img src={ellipse} alt="Ellipse" />
            <div className="insid">
              <p>User Experience Class</p>
              <p>Today at 12.00 PM</p>
            </div>
          </div>
        </div>
        <div className="digram">
          <img src={digram} alt="Digram" />
          <img src={user} alt="User" />
        </div>
      </div>
    </div>
  );
};

export default Title;
