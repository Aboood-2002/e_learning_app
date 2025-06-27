import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Courses.css'
import code from '../../Assets/code.png';
import duration from '../../Assets/duration.png';
import tag from '../../Assets/tag.png';
import design from '../../Assets/design.png';
import dev from '../../Assets/Develope.png';
import markting from '../../Assets/markting.png';
import bues from '../../Assets/bues.png';
import programing from '../../Assets/programming.png';
import uiux from '../../Assets/uiux.png';
// import ecommerce from '../../Assets/ecommerce.png';
// import helloworld from '../../Assets/helloworld.png';
// import Adobe from '../../Assets/adobe.png';
// import illustrator from '../../Assets/illustrator.png';
// import xd from '../../Assets/xd.png';
// import Software from '../../Assets/sodtware.png';
// import Cplusee from '../../Assets/c++.png';
// import E_buese from '../../Assets/E_buese.png';
import mark from '../../Assets/mark.png';
import { useDispatch , useSelector } from "react-redux"
import { useEffect , useState} from "react";
import { fetchCourses } from "../redux/apiCalls/courseApiCall";
const Courses = () => {

    const navigate = useNavigate(); // Initialize navigation function
    const dispatch = useDispatch()
    const { courses } = useSelector(state => state.course)

  useEffect(() => {
    dispatch(fetchCourses());
  }, []);

  // Get 3 random courses
  const getRandomCourses = (courses, count = 3) => {
    const shuffled = [...courses].sort(() => Math.random() - 0.5); // Simple shuffle
    return shuffled.slice(0, Math.min(count, courses.length));
  };

  // Filter courses by category
  const designCourses = courses.filter((course) => course.category === 'design');
  const programmingCourses = courses.filter((course) => course.category === 'programming');
  const businessCourses = courses.filter((course) => course.category === 'business');
  const recommendedCourses = getRandomCourses(courses); // Get 3 random courses


    return (
        <div className='Corses'>
            <h1>Choose favorite course</h1>
            <div className="courses_cardes">
                <div className="course_card">
                    <img src={design} alt="" />
                    <h2>Design</h2>
                    <p>Learn graphic design techniques</p>
                </div>
                <div className="course_card">
                    <img src={markting} alt="" />
                    <h2>Marketing</h2>
                    <p>Learn marketing strategies</p>
                </div>
                <div className="course_card">
                    <img src={dev} alt="" />
                    <h2>Development</h2>
                    <p>Learn soft skills in business and technology</p>
                </div>
                <div className="course_card">
                    <img src={bues} alt="" />
                    <h2>E-Business</h2>
                    <p>Learn how to create an e-commerce business</p>
                </div>

                <div className="course_card">
                        <img src={programing} alt="" />
                    <h2>programming</h2>
                    <p>Learn data analysis and visualization techniques</p>
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
                         <p><img src={tag} alt="Category" />{course.category}</p>
                         <p><img src={duration} alt="Duration" />{course.duration} hours</p>
                       </div>
                       <img className="course_img" src={course.courseImg?.url} alt={course.title} />
                       <h6>{course.title}</h6>
                      <p>{course.description}</p>
                    </div>
                    ))}
            </div>

            <div className="Design"> 
                    <h2>Design</h2>
             {designCourses.map((course) => (
                    <div 
                       className="courses" 
                       key={course._id} 
                       onClick={() => navigate(`/course/${course._id}`)}
                     >
                      <div className="duratiion">
                         <p><img src={tag} alt="Category" />{course.category}</p>
                         <p><img src={duration} alt="Duration" />{course.duration} hours</p>
                       </div>
                       <img className="course_img" src={course.courseImg?.url} alt={course.title} />
                       <h6>{course.title}</h6>
                      <p>{course.description}</p>
                    </div>
                    ))}
            </div>

            <div className="programming">
                <h2>Programming</h2>
                         {programmingCourses.map((course) => (
                    <div 
                       className="courses" 
                       key={course._id} 
                       onClick={() => navigate(`/course/${course._id}`)}
                     >
                      <div className="duratiion">
                         <p><img src={tag} alt="Category" />{course.category}</p>
                         <p><img src={duration} alt="Duration" />{course.duration} hours</p>
                       </div>
                       <img className="course_img" src={course.courseImg?.url} alt={course.title} />
                       <h6>{course.title}</h6>
                      <p>{course.description}</p>
                    </div>
                    ))}
            </div>

            <div className="Business">
                <h2>Business</h2>
                    {businessCourses.map((course) => (
                    <div 
                       className="courses" 
                       key={course._id} 
                       onClick={() => navigate(`/course/${course._id}`)}
                     >
                      <div className="duratiion">
                         <p><img src={tag} alt="Category" />{course.category}</p>
                         <p><img src={duration} alt="Duration" />{course.duration} hours</p>
                       </div>
                       <img className="course_img" src={course.courseImg?.url} alt={course.title} />
                       <h6>{course.title}</h6>
                      <p>{course.description}</p>
                    </div>
                    ))}
            </div>
            <div className="viewes">
                <h2>Most Viewed Courses</h2>
            <div className="courses"  onClick={() => navigate('/Markting')}>
                        <div className="duratiion">
                            <p> <img src={tag} alt="" />BUSINESS</p>
                            <p><img src={duration} alt="" />6 Month</p>
                        </div>
                        <img className='course_img' src={mark} alt="" />
                        <h6>Marketing</h6>
                        <p>understanding the needs of customers, and communicating how a business meets those needs</p>
                    </div>
                    <div className="courses"  onClick={() => navigate('/UIUX')}>
                        <div className="duratiion">
                            <p> <img src={tag} alt="" />PROGRAMMING</p>
                            <p><img src={duration} alt="" />3 Month</p>
                        </div>
                        <img className='course_img' src={uiux} alt="" />
                        <h6>UI UX DESIDN</h6>
                        <p>Simply put, user experience design is the process of planning the experience a person has when they interact with a product</p>
                    </div>
                    <div className="courses"  onClick={() => navigate('/Python')}>
                        <div className="duratiion">
                            <p> <img src={tag} alt="" />PROGRAMMING</p>
                            <p><img src={duration} alt="" />3 Month</p>
                        </div>
                        <img className='course_img' src={code} alt="" />
                        <h6>python</h6>
                        <p>learn how to code in Python, design and access databases, create interactive web applications, and share your apps with the world</p>
                    </div>
            </div>

        </div>
    )
}

export default Courses
