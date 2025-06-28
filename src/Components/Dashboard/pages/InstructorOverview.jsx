import { useState, useEffect } from 'react';
import {  useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BookOpen, Users, FileQuestion, TrendingUp, Award, Clock, DollarSign } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import './main.css';


const InstructorOverview = () => {

  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const [instructorStats, setInstructorStats] = useState({
    totalCourses: 0,
    totalStudents: 0,
    completionRate: 0,
    revenue: 0,
    recentActivity: [],
    activeQuizzes: 0,
    avgRating: 0
  });
  const [instructorCourses, setInstructorCourses] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }


    if (location.pathname === '/dashboard/instructor' && user.role === 'instructor') {
      const fetchInstructorData = async () => {
        try {
          const [statsResponse, coursesResponse] = await Promise.all([
            axios.get('/api/dashboard/instructor', {
              headers: { Authorization: `Bearer ${user.token}` }
            }),
            axios.get('/api/courses/instructor', {
              headers: { Authorization: `Bearer ${user.token}` }
            })
          ]);
          setInstructorStats(statsResponse.data);
          setInstructorCourses(coursesResponse.data);
        } catch (error) {
          console.error('Error fetching instructor data:', error);
        }
      };
      fetchInstructorData();
    }
  }, [user, navigate, location.pathname]);

    // if (user.role !== 'instructor') {
    //   return (
    //     <div className="dashboard-page">
    //       <p className="text-danger">Access denied. Instructors only.</p>
    //     </div>
    //   );
    // }

    return (
      <Layout>
      <div className="instructor-overview">
        <div className="page-header">
          <div>
            <h1 className="heading">Instructor Overview</h1>
            <p className="text-secondary">Your teaching performance and course analytics</p>
          </div>
          <Button variant="primary" onClick={() => navigate('/studentCourses')}>
            View Courses
          </Button>
        </div>

        <div className="grid grid-cols-4">
          <Card>
            <div className="instructor-stat-card">
              <div>
                <p className="instructor-stat-label">Total Courses</p>
                <p className="instructor-stat-value">{instructorStats.totalCourses}</p>
              </div>
              <div className="instructor-stat-icon bg-blue">
                <BookOpen size={24} color="#fff" />
              </div>
            </div>
          </Card>
          <Card>
            <div className="instructor-stat-card">
              <div>
                <p className="instructor-stat-label">Total Students</p>
                <p className="instructor-stat-value">{instructorStats.totalStudents.toLocaleString()}</p>
              </div>
              <div className="instructor-stat-icon bg-green">
                <Users size={24} color="#fff" />
              </div>
            </div>
          </Card>
          <Card>
            <div className="instructor-stat-card">
              <div>
                <p className="instructor-stat-label">Completion Rate</p>
                <p className="instructor-stat-value">{instructorStats.completionRate}%</p>
              </div>
              <div className="instructor-stat-icon bg-purple">
                <TrendingUp size={24} color="#fff" />
              </div>
            </div>
          </Card>
          <Card>
            <div className="instructor-stat-card">
              <div>
                <p className="instructor-stat-label">Total Revenue</p>
                <p className="instructor-stat-value">${instructorStats.revenue.toLocaleString()}</p>
              </div>
              <div className="instructor-stat-icon bg-orange">
                <DollarSign size={24} color="#fff" />
              </div>
            </div>
          </Card>
        </div>

        <Card>
          <div className="instructor-section-header">
            <h3 className="instructor-section-title">Course Performance</h3>
          </div>
          <div className="instructor-course-list">
            {instructorCourses.map((course) => (
              <div key={course.id} className="instructor-course-item">
                <div className="instructor-course-info">
                  <div className="instructor-course-icon">
                    <BookOpen size={24} color="#2563EB" />
                  </div>
                  <div>
                    <h4 className="instructor-course-title">{course.title}</h4>
                    <p className="instructor-course-meta">{course.level} • {course.duration}</p>
                  </div>
                </div>
                <div className="instructor-course-stats">
                  <div className="instructor-stat">
                    <p className="instructor-stat-value">{course.enrolledStudents}</p>
                    <p className="instructor-stat-label">Students</p>
                  </div>
                  <div className="instructor-stat">
                    <p className="instructor-stat-value">${course.price}</p>
                    <p className="instructor-stat-label">Price</p>
                  </div>
                  <div className="instructor-stat">
                    <span className={`instructor-status-badge ${
                      course.status === 'Active' ? 'status-active' :
                      course.status === 'Draft' ? 'status-draft' :
                      'status-inactive'
                    }`}>
                      {course.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid grid-cols-2">
          <Card>
            <div className="instructor-section-header">
              <h3 className="instructor-section-title">Recent Activity</h3>
            </div>
            <div className="instructor-activity-list">
              {instructorStats.recentActivity.map((activity) => (
                <div key={activity.id} className="instructor-activity-item">
                  <div className={`instructor-activity-icon ${
                    activity.type === 'enrollment' ? 'bg-green-light' :
                    activity.type === 'completion' ? 'bg-blue-light' :
                    'bg-purple-light'
                  }`}>
                    {activity.type === 'enrollment' && <Users size={16} color="#16A34A" />}
                    {activity.type === 'completion' && <Award size={16} color="#2563EB" />}
                    {activity.type === 'quiz_submission' && <FileQuestion size={16} color="#7C3AED" />}
                  </div>
                  <div className="instructor-activity-content">
                    <p className="instructor-activity-description">{activity.description}</p>
                    <div className="instructor-activity-meta">
                      <Clock size={12} color="#6B7280" />
                      <span>{new Date(activity.timestamp).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <div className="instructor-section-header">
              <h3 className="instructor-section-title">Analytics Summary</h3>
            </div>
            <div className="instructor-analytics">
              <div className="instructor-progress">
                <div className="instructor-progress-header">
                  <span className="instructor-progress-label">Student Engagement</span>
                  <span className="instructor-progress-value">85%</span>
                </div>
                <div className="instructor-progress-bar">
                  <div className="instructor-progress-fill bg-blue" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div className="instructor-progress">
                <div className="instructor-progress-header">
                  <span className="instructor-progress-label">Quiz Pass Rate</span>
                  <span className="instructor-progress-value">78%</span>
                </div>
                <div className="instructor-progress-bar">
                  <div className="instructor-progress-fill bg-green" style={{ width: '78%' }}></div>
                </div>
              </div>
              <div className="instructor-progress">
                <div className="instructor-progress-header">
                  <span className="instructor-progress-label">Course Completion</span>
                  <span className="instructor-progress-value">{instructorStats.completionRate}%</span>
                </div>
                <div className="instructor-progress-bar">
                  <div className="instructor-progress-fill bg-purple" style={{ width: `${instructorStats.completionRate}%` }}></div>
                </div>
              </div>
              <div className="instructor-analytics-stats">
                <div className="instructor-stat">
                  <p className="instructor-stat-value">{instructorStats.activeQuizzes}</p>
                  <p className="instructor-stat-label">Active Quizzes</p>
                </div>
                <div className="instructor-stat">
                  <p className="instructor-stat-value">{instructorStats.avgRating}</p>
                  <p className="instructor-stat-label">Avg Rating</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

    </Layout>
    );
 };



export default InstructorOverview;