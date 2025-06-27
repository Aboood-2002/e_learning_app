import React from 'react'
import './ContactUs.css'
import phone from '../../Assets/phone.png';
import mail from '../../Assets/mail.png';
import clock from '../../Assets/clock.png';
import mappin from '../../Assets/mappin.png';
import location from '../../Assets/location.png';
import logos from '../../Assets/logos.png';
const ContactUs = () => {
    const openGoogleMaps = () => {
        window.open("https://maps.app.goo.gl/PQWgs5YNqZBUBNWa8", "_blank");
      };
    return (
        <div className='contactus'>
            <div className="title">
                <h1>Contact Us</h1>
            </div>
            <div className="info">
                <div className="leftinfo">
                    <h1>You Will <span>Grow</span>, You Will <span>Succeed</span>. <br /> We Promise That</h1>
                    <p>You can contact us by calling on the phone or sending a message via your email</p>
                    <div className="contactcards_1">
                        <div className="card_1">
                            <img src={phone} alt="" />
                            <h4>Call for inquiry</h4>
                            <p>+201015136028</p>
                        </div>
                        <div className="card_1">
                            <img src={mail} alt="" />
                            <h4>Send us email</h4>
                            <p>mohamadhussen565@gmail.com</p>
                        </div>
                    </div>
                    <div className="contactcards_2">
                        <div className="card_2">
                            <img src={clock} alt="" />
                            <h4>Opening hours</h4>
                            <p>Sun - Fri: 10AM - 10PM </p>
                        </div>

                        <div className="card_2">
                            <img src={mappin} alt="" />
                            <h4>Office</h4>
                            <p>El Ismailia ring road</p>
                        </div>
                    </div>
                </div>
                <div className="rightinfo">
                    <h1>Contact Info</h1>
                    <p>We are here to help you. Feel free to reach out to us anytime. Our dedicated team will be happy to assist you.</p>
                    <form>
                        <input type="text" placeholder="Your Name" />
                        <input type="email" placeholder="Your Email" />
                        <input type="text" placeholder="Subject" />
                        <textarea placeholder="Your Message"></textarea>
                        <button type="submit">Send Message</button>
                    </form>
                </div>     
            </div>
            <div className="map-container" onClick={openGoogleMaps}>
      <img src={location} alt="Map of Suez Canal University" className="map-image" />
      <div className="map-overlay">Click to Open in Google Maps</div>
    </div>
    <img src={logos} alt="" />
        </div>
    )
}

export default ContactUs
