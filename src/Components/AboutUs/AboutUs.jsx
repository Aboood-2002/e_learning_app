import React, { useState } from 'react';
import "./AboutUs.css"
import folks from '../../Assets/floks.png';
import map from '../../Assets/map.png';
import teammember from '../../Assets/teammember.png';
const AboutUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    title: "",
    subject: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Feedback submitted:", formData);
    alert("Thank you for your feedback!");
  };
  return (
    <div className='AboutUs'>
      <h1>We’re here to <br />
      <span>guarantee your success</span></h1>
      <div className="blueBarnare">
        <p>Welcome to OPLAT, your favorite platform for learning new skills and self -development online! We believe that education is the key to achieving success in a rapidly changing world, and for this we strive to provide a distinguished educational experience that meets your needs and aspirations . </p>
      </div>
      <img className='folks' src={folks} alt="" />
      <h1>We’re here for you <br />
      <span>no matter where you are</span></h1>
      <img className='map' src={map} alt="" />
      <div className="OurMision">
        <h2>Our Mission</h2>
        <ul>
            <li>Unmatched service <p>We are not only satisfied with providing educational content, but are keen to provide a comprehensive experience that puts your needs in the introduction .</p></li>
            <li>Specific <p>By accurately analyzing your needs and providing guided content, we guarantee that each course or lesson you join reflects your personal and professional aspirations. Whether you are looking to develop specific technical skills, learning a new language, or acquiring knowledge .</p></li>
            <li>Experience <p>An experience in the field of electronic teaching for more than 5 years</p></li>
            <li>Technology <p>The best combination of technology and people.</p></li>
        </ul>
      </div>
      <div className="OurCommitment">
        <ul>
            <li>Ethics <p>Careful to ensure the quality of educational content, respect for intellectual property rights, and protect the privacy of our users' data. We also guarantee that all courses and lessons are presented objectively and impartially, taking into account cultural and intellectual diversity</p></li>
            <li>Quality <p>ConsultUs is committed to ensuring that our advice and recommendations are based on the best combination of methods, information research, creativity and  quality assurance. </p></li>
            <li>Continuity <p>ConsultUs considers that the continuity of relations on the long term with its clients is the guarantee of the satisfaction of these and the quality of the services provided.</p></li>
        </ul>
      </div>
      <div className="OurSuccessTeam">
        <h1>Our Success Team</h1>
        <img src={teammember} alt="" />
      </div>
      <div className="feedback-container">
      <h2>Feedback Form</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Full Name" required onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
        <input type="tel" name="phone" placeholder="Phone Number" required onChange={handleChange} />
        <input type="text" name="title" placeholder="Title/Position" required onChange={handleChange} />
        <textarea name="subject" placeholder="Your Message" required onChange={handleChange}></textarea>
        <button type="submit">Send Feedback</button>
      </form>
    </div>
    </div>
  )
}

export default AboutUs
