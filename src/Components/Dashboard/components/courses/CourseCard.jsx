import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../common/Card';
import Badge from '../common/Badge';
import './main.css'

const CourseCard = ({ course }) => {
  return (
    <Card>
      <div className="course-content">
        <img src={course?.courseImg?.url} alt={course?.title} className="course-image" />
        <div className="course-info">
          <h3 className="heading">{course?.title}</h3>
          <p className="text-secondary">{course?.description}</p>
          <div className="flex items-center gap-2">
            {/* <Badge type={course?.level.toLowerCase()}>{course?.level}</Badge> */}
            <span className="text-secondary">{course?.duration} hours</span>
          </div>
          <Link to={`/mycourses/${course?._id}`} className="button button-primary">
            View Course
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default CourseCard;