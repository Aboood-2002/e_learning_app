import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Nav from './Components/Home Page/NavBar/Nav';
import Title from './Components/Home Page/Title/Title';
import Cloud from './Components/Home Page/Cloud/Cloud';
import Features from './Components/Home Page/Features/Features';
import Footer from './Components/Home Page/Footer/Footer';
import Login from './Components/Registertion/LogIn/Login';
import Register from './Components/Registertion/Register/Register';
import Landing from './Components/LandingPage/Landing';
import Quiz from './Components/Quiz/Quiz';
import Courses from './Components/Courses/Courses';
import CoursePage from './Components/CoursePage/coursePage';
import Loading from "./Components/LoadingPage/Loading";
import AboutUs from "./Components/AboutUs/AboutUs";
import ContactUs from "./Components/ContactUs/ContactUs";
import Lesson from "./Components/LessonsPage/Lesson";
import ChatAi from "./Components/ChatAi/chatAi"
import PaymentSuccess from "./Components/Payments/PaymentSuccess"
import PaymentCancel from "./Components/Payments/PaymentCancel"
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import Dashboard from "./Components/Dashboard/pages/Dashboard";
// import { ThemeProvider } from './ThemeContext'
import Progm from './Components/Books/Porgramming/Progm';
import Marketing from './Components/Books/Marketing/Marketing';
import Graphic from './Components/Books/Graphic/Graphic';
import Soft from './Components/Books/Soft/Soft';
import StudentCourses from "./Components/Dashboard/pages/Courses";
import CourseDetails from "./Components/Dashboard/pages/CourseDetails";
import Quizzes from "./Components/Dashboard/pages/Quizzes";
import Students from "./Components/Dashboard/pages/Students";
import ForgetPassword from "./Components/Registertion/Forget-Password/forgetPassword"
import Performance from "./Components/Dashboard/pages/Performance";
import InstructorOverview from "./Components/Dashboard/pages/InstructorOverview";
import Lessons from "./Components/Dashboard/pages/Lessons";
import Questions from "./Components/Dashboard/pages/Questions";
// Helper to detect current path
const Layout = ({ children }) => {
  const location = useLocation();
  const hideLayout = location.pathname.startsWith("/chat"); // Hides for /chat and /chat/:id

  return (
    <>
      {!hideLayout && <Nav />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
};

const App = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);

  return (
    // <ThemeProvider> {/* Wrap your entire app with ThemeProvider */}
    <Router>
      <ToastContainer theme="colored" position="top-center" />
      <PageTransition setLoading={setLoading} />
      {loading && <Loading />}

      <Layout>
        <Routes>
          <Route path="/" element={
            <>
              <Title />
              <Cloud />
              <Features />
            </>
          } />
          <Route path="/progm" element={<Progm/>} />
          <Route path="/Marketing" element={<Marketing/>} />
          <Route path="/Graphic" element={<Graphic/>} />
          <Route path="/soft" element={<Soft/>} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/landing" />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/landing" />} />
          <Route path="/landing" element={!user ? <Navigate to="/" /> : <Landing />} />
          <Route path="/course/:courseId/Quiz/:quizId" element={!user ?<Navigate to="/" />:<Quiz />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/course/:id" element={<CoursePage />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/course/:id/lessons" element={!user ?<Navigate to="/" />:<Lesson />} />
          <Route path="/chat" element={!user ? <Navigate to="/" /> : <ChatAi />} />
          <Route path="/chat/:chatId" element={!user ? <Navigate to="/" /> : <ChatAi />} />
          <Route path="/payment/success" element={!user ?<Navigate to="/" />:<PaymentSuccess />} />
          <Route path="/payment/cancel" element={!user ?<Navigate to="/" />:<PaymentCancel />} />
          <Route path="/dashboard" element={!user? <Navigate to="/" /> :<Dashboard/>} />
          <Route path="/dashboard/courses" element={!user ?<Navigate to="/" />:<StudentCourses/>} />
          <Route path="/mycourses/:id" element={!user ?<Navigate to="/" />:<CourseDetails/>} />
          <Route path="/dashboard/quizzes" element={!user? <Navigate to="/" /> :<Quizzes/>} />
          <Route path="/dashboard/students" element={!user? <Navigate to="/" /> :<Students/>} />
          <Route path="/forgetPassword" element={<ForgetPassword/>} />
          <Route path="/dashboard/performance" element={!user? <Navigate to="/" /> :<Performance/>} />
          <Route path="/dashboard/instructor" element={!user? <Navigate to="/" /> :<InstructorOverview/>} />
          <Route path="/dashboard/lessons" element={!user? <Navigate to="/" /> :<Lessons/>} />
          <Route path="/dashboard/questions" element={!user? <Navigate to="/" /> :<Questions/>} />
        </Routes>
      </Layout>
    </Router>
    // </ThemeProvider> 
  );
};

// Detect route changes and trigger loading animation
const PageTransition = ({ setLoading }) => {
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [location, setLoading]);

  return null;
};

export default App;
