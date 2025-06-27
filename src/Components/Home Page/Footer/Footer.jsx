import React from 'react'
import './Footer.css'
import darklogo from '../../../Assets/DarkLogo.png';
const Footer = () => {
  return (
    <div className='footer'>
            <div className="first">
                <img src={darklogo} alt="" />
                <h6>Online <br />platform</h6>
            </div>
            <p>Subscribe to get our Newsletter</p>
            <div className="second">
                <input type="text" placeholder='Your Email' />
                <button className='Subscribe'>Subscribe</button>
            </div>
            <div className="third">
                <p>Careers</p>
                <p>Privacy Policy</p>
                <p>Terms & Conditions</p>
            </div>
            <p>© 2025 All rights reserved </p>
    </div>
  )
}

export default Footer
