import { useEffect, useState , useRef} from 'react';
import "./Lesson.css";
import { useDispatch , useSelector } from "react-redux"
import { fetchLessons,fetchQuizzes, fetchSingleCourse } from "../redux/apiCalls/courseApiCall";
import { useNavigate, useParams } from 'react-router-dom';
const Lesson = () => {

const navigate = useNavigate(); 
const dispatch = useDispatch()
const { id } = useParams();

const { lessons , quizzes , course } = useSelector(state => state.course)
  useEffect(() => {
    dispatch(fetchLessons(id))
    dispatch(fetchQuizzes(id))
    dispatch(fetchSingleCourse(id))
  }, [id]);


  return (
    <div className="Lesson-container">

      {/* Video Section (left) */}
      <div className="lesson-page">
        <aside className="lesson-sidebar">
          <h3>Lessons</h3>
          <ul>
            {lessons.map((lesson, index) => (
              <li key={lesson?._id}>
                Lesson {index + 1}: {lesson?.title}
              </li>
            ))}
          </ul>
        </aside>

        <main className="lesson-content">
          <h2>Lesson Videos</h2>
          <div className="video-grid">
            {lessons.map((lesson) => (
              <div className="video-wrapper" key={lesson?._id}>
                <iframe
                  width="100%"
                  height="250"
                  src={`${lesson?.videoUrl?.url}`}
                  title={lesson?.title}
                  frameBorder="0"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                >
                </iframe>
                <p>{lesson?.title}</p>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Static Sidebar Content (middle) */}
      <div className="Lesson-sidebar">
        <div className="Lesson-card">
          <h2>Change Simplification</h2>
          <ul className="Lesson-list">
            {lessons.map((lesson, index) => (
              <li key={index} className="Lesson-item">
                <div className="Lesson-info">
                  <span className="Lesson-title">{lesson?.title}</span>
                  <span className="Lesson-time">{lesson?.duration}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="Lesson-card">
          <h2>PRACTICE QUIZ</h2>
          <ul className="Lesson-list">
            {quizzes.map((quiz, index) => (
              <li key={index} className="Lesson-item">
                <div className="Lesson-info" onClick={() => navigate(`/course/${course?._id}/Quiz/${quiz?._id}`)}>
                  <span className="Lesson-title">{quiz?.title}</span>
                  <span className="Lesson-time">{quiz?.duration} mins</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Informational Content (right) */}
      <div className="Lesson-content">
        <div className="header">
          <h1>{course?.title}</h1>
          <p className="subheading">introduction about {course?.title}</p>
        </div>

        <div className="Lesson-content-card">
          <h2>What is {course?.title}</h2>
          <p>
            {course?.description}
          </p>

          <div className="Lesson-advantages">
            <h2>What are the advantages of {course?.title}</h2>
            <ul>
              <li>User-Friendly Interface</li>
              <li>Seamless Integration with Adobe Creative Cloud</li>
              <li>Prototyping and Wireframing</li>
              <li>Real-Time Collaboration</li>
              <li>Repeat Grid</li>
              <li>Responsive Resize</li>
              <li>Voice Prototyping</li>
              <li>Auto-Animate</li>
              <li>Plugins and Integrations</li>
              <li>Cross-Platform Compatibility</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lesson;
