import './coursePage.css';
import { FaFacebook, FaYoutube, FaInstagram, FaTelegram, FaWhatsapp, FaTimes } from 'react-icons/fa';
import Courseback from '../../Assets/couresback.png';
import stars from '../../Assets/stars.png';
import ali from '../../Assets/ali.png';
import lina from '../../Assets/lina.png';
import qulity from '../../Assets/qulity.png';
import devices from '../../Assets/devices.png';
import certificat from '../../Assets/certificat.png';
import moduls from '../../Assets/moduls.png';
import duration from '../../Assets/duration.png';
import tag from '../../Assets/tag.png';
import buble from '../../Assets/buble.png';
import bubleo from '../../Assets/bubleo.png';
import squarblue from '../../Assets/squarblue.png';
import squargreen from '../../Assets/squargreen.png';
import video from '../../Assets/video.png';
import barat from '../../Assets/barat.png';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchSingleCourse, fetchCourses, buyCourse } from '../redux/apiCalls/courseApiCall';
import { getUserProfile } from '../redux/apiCalls/profileApiCall';
import { loadStripe } from '@stripe/stripe-js';
import { useNavigate, useParams } from 'react-router-dom';
import { courseActions } from '../redux/slices/courseSlice';
import request from '../utils/request';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY ); // Fallback key

const CoursePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { course, courses, loading, checkoutSessionId, checkoutError } = useSelector((state) => state.course);
  const { user } = useSelector((state) => state.auth || {});
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [checkingEnrollment, setCheckingEnrollment] = useState(true);

  // Fetch course and courses
  useEffect(() => {
    if (!id) {
      setError('Invalid course ID');
      return;
    }
    dispatch(fetchSingleCourse(id));
    dispatch(fetchCourses());
  }, [id, dispatch]);

  // Fetch user profile
  useEffect(() => {
    if (user?._id) {
      dispatch(getUserProfile(user._id));
    }
  }, [dispatch, user?._id]);

  // Check enrollment status
  useEffect(() => {
    const checkEnrollment = async () => {
      if (!user || !user.token) {
        setIsEnrolled(false);
        setCheckingEnrollment(false);
        return;
      }
      try {
        const response = await request.get(`/api/payments/check/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
            'Content-Type': 'application/json',
          },
        });
        setIsEnrolled(response.data.success);
      } catch (err) {
        setIsEnrolled(false);
        setError(err.response?.data?.message || 'Failed to check enrollment');
      } finally {
        setCheckingEnrollment(false);
      }
    };
    checkEnrollment();
  }, [id, user]);

  // Redirect to Stripe Checkout when sessionId is set
  useEffect(() => {
    const redirectToCheckout = async () => {
      if (checkoutSessionId) {
        try {
          const stripe = await stripePromise;
          if (!stripe) throw new Error('Stripe failed to initialize');
          await stripe.redirectToCheckout({ sessionId: checkoutSessionId });
          dispatch(courseActions.clearCheckout());
        } catch (err) {
          setError(err.message);
          dispatch(courseActions.clearCheckout());
        }
      }
    };
    redirectToCheckout();
  }, [checkoutSessionId, dispatch]);

  // Handle checkout
  const handleCheckout = async () => {
    setError(null);
    if (!user) {
      navigate('/login'); // Guest redirects to login
      return;
    }
    // if (user.role !== 'student') {
    //   setError('Only students can purchase courses');
    //   return;
    // }
    try {
      await dispatch(buyCourse(id)).unwrap();
    } catch (err) {
      setError(checkoutError || 'Failed to initiate checkout');
    }
  };

  // Handle Study Now
  const handleStudyNow = () => {
    navigate(`/course/${course._id}/lessons`);
  };

  // Get 3 random courses
    const getRandomCourses = (courses, count = 3) => {
    const shuffled = [...courses].sort(() => Math.random() - 0.5); // Simple shuffle
    return shuffled.slice(0, Math.min(count, courses.length));
  };

  const recommendedCourses = getRandomCourses(courses); // Get 3 random courses


  if (!course) return <div>Loading...</div>;

  return (
    <div className='XD'>
      <div className="header_img">
        <img src={Courseback} alt="" />
      </div>
      <div className="XD_content">
        <div className="XD_left">
          <div className='Overview'>Overview</div>
          <img src={stars} alt="" />
          <div className="rating">
            <div className="set_rate">
              <div className="top_rate">
                <h4>4 out of 5</h4>
                <img src={stars} alt="" />
                <p>125 reviews</p>
              </div>
              <div className="rating_bars">
                <div className="bar">5_Stars <img src={barat} alt="" /></div>
                <div className="bar">4_Stars <img src={barat} alt="" /></div>
                <div className="bar">3_Stars <img src={barat} alt="" /></div>
                <div className="bar">2_Stars <img src={barat} alt="" /></div>
                <div className="bar">1_Stars <img src={barat} alt="" /></div>
              </div>
            </div>
          </div>
          <div className="comments">
            <div className="comment_1">
              <div className="person">
                <img src={ali} alt="" />
                <p>Hello</p>
              </div>
              <p>very good</p>
            </div>
            <div className="comment_2">
              <div className="person">
                <img src={lina} alt="" />
                <p>Lina</p>
              </div>
              <p>The best educational course ever</p>
            </div>
          </div>
        </div>
        <div className="XD_right">
          <div className="Course_Study_Card">
            <img className='xness' src={course?.courseImg?.url} alt={course?.title} />
            <h2>{course?.title}</h2>
            <p>Only {course?.price} EGP</p>
            <p>11 hours left at this price</p>
            {checkingEnrollment ? (
              <p>Checking enrollment...</p>
            ) : isEnrolled ? (
              <button className="Study" onClick={handleStudyNow}>
                Study Now
              </button>
            ) : (
              <button className="Study" onClick={handleCheckout} disabled={loading}>
                {loading ? 'Processing...' : 'Buy Now'}
              </button>
            )}
            {error && <p className="error">{error}</p>}
            <hr />
            <h2>This Course includes</h2>
            <div className='proses'>
              <ul>
                <li><img src={qulity} alt="" />The best quality</li>
                <li><img src={devices} alt="" />Access on all devices</li>
                <li><img src={certificat} alt="" />Certification of completion</li>
                <li><img src={moduls} alt="" />32 Modules</li>
              </ul>
            </div>
            <hr />
            <h2>Training 5 or more people</h2>
            <p>Class, launched less than a year ago by Blackboard co-founder Michael Chasen, integrates exclusively...</p>
            <hr />
            <h2>Share this course</h2>
            <div className='iconat'>
              <ul>
                <li><FaTimes /></li>
                <li><FaFacebook /></li>
                <li><FaYoutube /></li>
                <li><FaInstagram /></li>
                <li><FaTelegram /></li>
                <li><FaWhatsapp /></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="Recommended">
        <h2>Recommended for you</h2>
        {recommendedCourses.map((course) => (
          <div
            className="courses"
            key={course._id}
            onClick={() => navigate(`/course/${course._id}`)}
          >
            <div className="duratiion">
              <p><img src={tag} alt="Category" />{course?.category}</p>
              <p><img src={duration} alt="Duration" />{course?.duration} hours</p>
            </div>
            <img className="course_img" src={course?.courseImg?.url} alt={course?.title} />
            <h6>{course?.title}</h6>
            <p>{course?.description}</p>
          </div>
        ))}
      </div>
      <h1><span>What is </span>FCI ONLINE</h1>
      <p>It is a distance learning platform that aims to enable the student to receive accredited courses from the Faculty of Computers and Information, Suez Canal University.</p>
      <div className="fci">
        <div className="para">
          <img className='buble' src={buble} alt="" />
          <h5>Everything you can do in a physical classroom, <span>you can do with FCI ONLINE</span></h5>
          <p>The platform offers you lecturers and assistants at the highest professional level, while you are in the classroom directly</p>
          <img className='bubleo' src={bubleo} alt="" />
        </div>
        <div className="imgy">
          <img className='squarblue' src={squarblue} alt="" />
          <img className='video' src={video} alt="" />
          <img className='squargreen' src={squargreen} alt="" />
        </div>
      </div>
    </div>
  );
};

export default CoursePage;