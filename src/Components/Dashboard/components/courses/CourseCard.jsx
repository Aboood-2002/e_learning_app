import { Link } from 'react-router-dom';
import './main.css';

const CourseCard = ({ course }) => {
  return (
    <div className="course-content">
      <img
        src={course.courseImg?.url || 'https://via.placeholder.com/300x200'}
        alt={course.title}
        className="course-image"
      />
      <div className="course-info">
        <h3 className="heading">{course.title}</h3>
        <div className="course-meta">
          {/* <span className={`badge badge-${course.level.toLowerCase()}`}>
            {course.level}
          </span> */}
          <span className="text-secondary">{course.duration} hours</span>
          <span className="text-secondary">${course.price}</span>
        </div>
        <Link to={`/courses/${course._id}`} className="button button-primary">
          View Course
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;