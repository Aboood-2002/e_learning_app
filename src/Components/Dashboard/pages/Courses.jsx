import Layout from '../components/layout/Layout';
import CourseCard from '../components/courses/CourseCard';
//import { mockCourses } from '../data/mockData';
import './main.css'
import {useSelector,useDispatch} from "react-redux";
import { useEffect } from "react";
import { fetchUserCourses } from "../../redux/apiCalls/courseApiCall";

const Courses = () => {

    const dispatch = useDispatch()
    const {userCourses} = useSelector(state=>state.course)
    useEffect(()=>{
      dispatch(fetchUserCourses())
    },[dispatch])
  return (
    <Layout>
      <div className="courses-page">
        <div className="page-header">
          <h1 className="heading">Courses</h1>
        </div>
        <div className="grid grid-cols-3">
          {userCourses.map(enrollment => (
            <CourseCard key={enrollment?._id} course={enrollment.course} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Courses;