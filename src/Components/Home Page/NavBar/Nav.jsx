import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Nav.css';
import logo from '../../../Assets/logo.png';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/apiCalls/authApiCall';
import { getUserProfile } from '../../redux/apiCalls/profileApiCall';
import ProfileCard from '../../profile/ProfileCard';
import ProfileEditor from '../../profile/ProfileEditor';
//import { useTheme } from '../../../ThemeContext';
//import { Sun, Moon } from 'lucide-react';

const Nav = () => {
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [showProfileEditor, setShowProfileEditor] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth || {});
  const { profile } = useSelector((state) => state.profile || {});
  const dispatch = useDispatch();
 // const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    if (user?._id) {
      dispatch(getUserProfile(user._id));
    }
  }, [user?._id, dispatch]);

  const handleProfilePhotoClick = () => {
    setShowProfileCard(true);
  };

  const handleEditProfile = () => {
    setShowProfileCard(false);
    setShowProfileEditor(true);
  };

  const handleProfileSave = () => {
    setShowProfileEditor(false);
    // Profile is updated in Redux via ProfileEditor
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    setShowProfileCard(false);
   // navigate('/login');
  };

  const handleCloseProfileCard = () => {
    setShowProfileCard(false);
  };

  const handleCloseProfileEditor = () => {
    setShowProfileEditor(false);
  };

  return (
    <nav>
      <img src={logo} alt="Logo" className="logo" onClick={() => navigate(`/`)} />
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>
      <ul className={menuOpen ? 'nav-links open' : 'nav-links'}>
        {user && <li><a href="/landing">Home</a></li>}
        {user && <li><a href="/chat">Ai Assistant</a></li>}
        {user?.role === 'admin' && <li><a href="/dashboard">Admin dashboard</a></li>}
        {user?.role === 'student' && <li><a href="/dashboard">Student dashboard</a></li>}
        <li><a href="/Courses">Courses</a></li>
        <li><a href="/AboutUs">AboutUs</a></li>
        <li><a href="/ContactUs">Contact Us</a></li>
      </ul>
      {user ? (
        <div className="profile-section">
          <button
            onClick={handleProfilePhotoClick}
            className="profile-photo-btn"
          >
            <div className="profile-photo">
              <img
                src={profile?.profilePhoto?.url }
                alt="Profile"
              />
            </div>
          </button>
        </div>
      ) : (
        <div className="buttons1">
          <button className="SignUp" onClick={() => navigate('/register')}>Sign Up</button>
          <button className="Login" onClick={() => navigate('/login')}>Login</button>
        </div>
      )}
      {/* <button onClick={toggleTheme} className="theme-toggle">
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </button> */}
      {showProfileCard && (
        <ProfileCard
          profile={profile}
          onEdit={handleEditProfile}
          onLogout={handleLogout}
          onClose={handleCloseProfileCard}
        />
      )}
      {showProfileEditor && (
        <ProfileEditor
          initialProfile={profile}
          onSave={handleProfileSave}
          onClose={handleCloseProfileEditor}
        />
      )}
    </nav>
  );
};

export default Nav;