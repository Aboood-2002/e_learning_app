import { SiCisco, SiHuawei, SiIntel, SiGoogle } from 'react-icons/si';
import './Landing.css'
import landingimg from '../../Assets/Landingimg.png';
import explore from '../../Assets/explore.png';
import badge from '../../Assets/badge.png';
import skills from '../../Assets/skills.png';
import market from '../../Assets/market.png';
import press from '../../Assets/press.png';
import tag from '../../Assets/tag.png';
import duration from '../../Assets/duration.png';
import sindy from '../../Assets/sindy.png';
import adm from '../../Assets/adm.png';
import xev from '../../Assets/xev.png';
import student from '../../Assets/student.png';
import layers from '../../Assets/layers.png';
import studtwo from '../../Assets/studtwo.png';
import studthree from '../../Assets/studthree.png';
import studfour from '../../Assets/studfour.png';
import { useEffect ,useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCourses } from '../redux/apiCalls/courseApiCall'; // Import the fetchCourses action
const Landing = () => {
  const [showPartners, setShowPartners] = useState(false);
  const [showBookPopup, setShowBookPopup] = useState(false);
  const [showProgramPopup, setShowProgramPopup] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Access courses from Redux state
  const { courses } = useSelector((state) => state.course);

    // Get 3 random courses
  const getRandomCourses = (courses, count = 3) => {
    const shuffled = [...courses].sort(() => Math.random() - 0.5); // Simple shuffle
    return shuffled.slice(0, Math.min(count, courses.length));
  };

 
  // Fetch courses when component mounts
  useEffect(() => {
      dispatch(fetchCourses())
  }, []);

  const closePopup = (e) => {
    if (e.target.classList.contains('popup-overlay')) {
      setShowBookPopup(false);
      setShowProgramPopup(false);
    }
  };

   const recommendedCourses = getRandomCourses(courses); // Get 3 random courses


  const handleClick = () => {
    window.location.href = '/chat';
  };
  const handleClick_2 = () => {
    window.location.href = 'https://www.cisco.com/';
  };
  const handleClick_3 = () => {
    window.location.href = 'https://www.huawei.com/en/';
  };
  const handleClick_4 = () => {
    window.location.href = 'https://www.intel.com/content/www/us/en/homepage.html';
  };
  const handleClick_5 = () => {
    window.location.href = 'https://about.google/';
  };

  return (
    <div className='Landing'>
      <div className="searchbar">
        <img src={landingimg} alt="Search Background" />
        <div className="query">
          <input
            type="text"
            className="search-input"
            placeholder="Search your favourite course..."
          />
          <button className="search-btn">Search</button>
        </div>
        <div className="options">
          <button className="Book" onClick={() => setShowBookPopup(true)}>Book</button>
          <button className="Partners" onClick={() => setShowPartners(!showPartners)}>
            Partners
          </button>
          <button className="Program" onClick={() => setShowProgramPopup(!showProgramPopup)}>Program</button>
          <button className="Assistant" onClick={handleClick}>AI Assistant</button>
        </div>
        {showPartners && (
          <div className="partners_dropdown">
            <ul>
              <li onClick={handleClick_2}><SiCisco /> Cisco</li>
              <li onClick={handleClick_3}><SiHuawei /> Huawei</li>
              <li onClick={handleClick_4}><SiIntel /> Intel</li>
              <li onClick={handleClick_5}><SiGoogle /> Google</li>
            </ul>
          </div>
        )}
        {showBookPopup && (
          <div className="popup-overlay" onClick={closePopup}>
            <div className="popup-content">
              <h2>Please select your book....</h2>
              <button onClick={() => navigate('/progm')}>Programming</button>
              <button onClick={() => navigate('/Marketing')}>Marketing</button>
              <button onClick={() => navigate('/Graphic')}>Graphic design</button>
              <button onClick={() => console.log('Course 3 clicked')}>Data Analyses</button>
              <button onClick={() => navigate('/soft')}>Soft skills</button>
              <button onClick={() => setShowBookPopup(false)}>Close</button>
            </div>
          </div>
        )}
        {showProgramPopup && (
          <div className="popup-overlay" onClick={closePopup}>
            <div className="popup-content">
              <h2>Please select your Course....</h2>
              <button onClick={() => navigate('/Quiz')}>C</button>
              <button onClick={() => console.log('Course 3 clicked')}>C++</button>
              <button onClick={() => console.log('Course 3 clicked')}>Python</button>
              <button onClick={() => console.log('Course 3 clicked')}>Dart</button>
              <button onClick={() => setShowProgramPopup(false)}>Close</button>
            </div>
          </div>
        )}
      </div>

      <div className="ourFeatures">
        <div className="ourFeatures_left">
          <div className="explor">
            <img src={explore} alt="" />
            <h6>Explore your Passion</h6>
            <p>Explore and better understand the various job profiles and career roadmaps...</p>
          </div>
          <div className="explor">
            <img src={badge} alt="" />
            <h6>Earn a certificate/badge</h6>
            <p>Finish your course and receive an e-certificate or badge</p>
          </div>
        </div>
        <div className="ourFeatures_right">
          <div className="skills">
            <img src={skills} alt="" />
            <h6>Learn skills & tools</h6>
            <p>Decide on your career-oriented learning path...</p>
          </div>
          <div className="market">
            <img src={market} alt="" />
            <h6>Connect with other students</h6>
            <p>Connect with other students from different fields...</p>
          </div>
        </div>
      </div>

      <div className="pressconfirance">
        <div className="press">
          <h4>Know about learning platform</h4>
          <p>Free E-book, video & consolation</p>
          <p>Top instructors from around world</p>
          <p>Top courses from your team</p>
          <button className='learning'>Start learning now</button>
        </div>
        <img src={press} alt="" />
      </div>

      <div className="Recommendtion">
        <h4>Recommended courses</h4>

      <div className="recommend">
        {recommendedCourses.map((course) => (
       <div 
          className="course-card" 
          key={course._id} 
          onClick={() => navigate(`/course/${course._id}`)}
        >
         <div className="duratiion">
            <p><img src={tag} alt="Category" />{course.category}</p>
            <p><img src={duration} alt="Duration" />{course.duration} hours</p>
          </div>
          <img className="img" src={course.courseImg?.url} alt={course.title} />
          <h6>{course.title}</h6>
         <p>{course.description}</p>
       </div>
       ))}
         </div>


      </div>

      <div className="staff">
        <h1>Classes taught by real creators</h1>
        <div className="staffboard">
          <div className="staff_member">
            <img src={sindy} alt="" />
            <h6>Jane Cooper</h6>
            <p>Instructor</p>
            <p className="staff_desc">Expert in web development...</p>
          </div>
          <div className="staff_member">
            <img src={adm} alt="" />
            <h6>Adam</h6>
            <p>Instructor</p>
            <p className="staff_desc">Passionate UI/UX designer...</p>
          </div>
          <div className="staff_member">
            <img src={xev} alt="" />
            <h6>Tomara</h6>
            <p>Instructor</p>
            <p className="staff_desc">Data scientist with a focus on AI...</p>
          </div>
        </div>
      </div>

      <div className="feedback">
        <h1>What our students have to say</h1>
        <div className="fedy">
          <div className="stud">
            <img src={student} alt="Student" />
          </div>
          <div className="feedback_text">
            <h3>Savannah Nguyen</h3>
            <h4>mohamadhussen565@gmail.com</h4>
            <p>I have been using this platform for the last 2 years...</p>
          </div>
          <div className="layers">
            <img src={layers} alt="Layer 1" />
            <img src={studtwo} alt="Student 2" />
            <img src={studthree} alt="Student 3" />
            <img src={studfour} alt="Student 4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;