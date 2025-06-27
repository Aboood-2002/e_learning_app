import React from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
//import { mockCourses } from '../data/mockData';
import './main.css'
import {useSelector,useDispatch} from "react-redux";
import { useEffect } from "react";
import { fetchSingleCourse ,fetchLessons} from "../../redux/apiCalls/courseApiCall";

const CourseDetails = () => {
  const { id } = useParams();
  const {course,lessons} = useSelector(state=>state.course)
  const dispatch = useDispatch()
  const navigate = useNavigate();
  useEffect(()=>{
  dispatch(fetchSingleCourse(id))
  dispatch(fetchLessons(id))
  },[dispatch,id])

  if (!course) {
    return (
      <Layout>
        <div className="error-message">Course not found</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="course-details">
        <Card>
          <div className="course-header">
            <div className="course-info">
              <h1 className="heading">{course?.title}</h1>
              <div className="course-meta">
                {/* <Badge type={course.level.toLowerCase()}>{course.level}</Badge> */}
                <span className="text-secondary">{course?.duration}</span>
              </div>
            </div>
            <Button variant="primary" onClick={()=>navigate(`/course/${course._id}/lessons`)}>Study Now</Button>
          </div>

          <div className="course-description">
            <h2 className="heading">Description</h2>
            <p className="text-secondary">{course?.description}</p>
          </div>

          <div className="course-curriculum">
            <h2 className="heading">Curriculum</h2>
            <div className="curriculum-list">
              {/* {course.map((module, index) => (
                <Card key={index} className="module-card">
                  <h3 className="heading">{module.title}</h3>

                </Card>
              ))} */}
                    <ul className="lesson-list">
                    {lessons.map((lesson, lessonIndex) => (
                      <li key={lessonIndex} className="lesson-item">
                        <span className="lesson-title">{lesson.title}</span>
                        <span className="lesson-duration">{lesson.duration}</span>
                      </li>
                    ))}
                  </ul>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default CourseDetails;