import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUserCourses } from '../../redux/apiCalls/courseApiCall';
import axios from 'axios';
import Layout from '../components/layout/Layout';
import CourseCard from '../components/courses/CourseCard';
import Button from '../components/common/Button';
import './main.css';
import { Plus, Search, Edit2, Trash2 } from 'lucide-react';

const Courses = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { userCourses } = useSelector((state) => state.course);
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    level: 'Beginner',
    duration: '',
    price: '',
  });
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    dispatch(fetchUserCourses());
  }, [dispatch, user, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !['instructor', 'admin'].includes(user.role)) {
      setError('Only instructors or admins can manage courses.');
      return;
    }
    const data = new FormData();
    data.append('title', formData.title);
    data.append('level', formData.level);
    data.append('duration', formData.duration);
    data.append('price', formData.price);
    if (image) data.append('image', image);

    try {
      if (editingCourse) {
        await axios.put(`/api/courses/${editingCourse._id}`, data, {
          headers: {
            Authorization: `Bearer ${user.token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        setSuccess('Course updated successfully!');
      } else {
        await axios.post('/api/courses', data, {
          headers: {
            Authorization: `Bearer ${user.token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        setSuccess('Course created successfully!');
      }
      setError('');
      resetForm();
      dispatch(fetchUserCourses());
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save course.');
      setSuccess('');
    }
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      level: course.level,
      duration: course.duration,
      price: course.price
    });
    setImage(null);
    setShowModal(true);
  };

  const handleDelete = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await axios.delete(`/api/courses/${courseId}`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setSuccess('Course deleted successfully!');
        setError('');
        dispatch(fetchUserCourses());
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete course.');
        setSuccess('');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      level: 'Beginner',
      duration: '',
      price: ''
    });
    setImage(null);
    setEditingCourse(null);
    setShowModal(false);
  };

  const filteredCourses = userCourses.filter(enrollment => {
    const course = enrollment.course;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = filterLevel === '' || course.level === filterLevel;
    return matchesSearch && matchesLevel;
  });

  if (!user) return null;

  return (
    <Layout>
      <div className="courses-page">
        <div className="page-header">
          <h1 className="heading">Courses</h1>
          {['instructor', 'admin'].includes(user.role) && (
            <Button
              variant="primary"
              onClick={() => setShowModal(true)}
            >
              <Plus className="icon" />
              Add Course
            </Button>
          )}
        </div>

        {/* Filters */}
        <div className="course-actions">
          <div className="form-group">
            <label htmlFor="search" className="sr-only">Search courses</label>
            <div className="search-container">
              <Search className="search-icon" />
              <input
                type="text"
                id="search"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input search-input"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="levelFilter" className="sr-only">Filter by level</label>
            <select
              id="levelFilter"
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              className="form-input"
            >
              <option value="">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-3">
          {filteredCourses.map(enrollment => (
            <div key={enrollment._id} className="card">
              <CourseCard course={enrollment.course} />
              {['instructor', 'admin'].includes(user.role) && (
                <div className="course-actions">
                  <Button
                    variant="secondary"
                    onClick={() => handleEdit(enrollment.course)}
                  >
                    <Edit2 className="icon" />
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(enrollment.course._id)}
                  >
                    <Trash2 className="icon" />
                  </Button>
                </div>
              )}
            </div>
          ))}
          {filteredCourses.length === 0 && (
            <div className="empty-state">
              <img src="https://via.placeholder.com/48" alt="No courses" className="icon-large" />
              <p className="text-secondary">No courses found. Try adjusting your search or filters.</p>
            </div>
          )}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="modal-overlay">
            <div className="course-form-container modal-content">
              <h2 className="heading">{editingCourse ? 'Edit Course' : 'Add New Course'}</h2>
              {error && <p className="text-danger">{error}</p>}
              {success && <p className="text-success">{success}</p>}
              <form onSubmit={handleSubmit} className="course-form">
                <div className="form-group">
                  <label htmlFor="title">Course Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="level">Level</label>
                  <select
                    id="level"
                    name="level"
                    value={formData.level}
                    onChange={handleInputChange}
                    className="form-input"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="duration">Duration (e.g., 10h)</label>
                  <input
                    type="text"
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="price">Price ($)</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="image">Course Image {editingCourse ? '(Optional)' : ''}</label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="form-input"
                  />
                  {editingCourse && (
                    <p className="text-secondary text-sm">
                      Current image: {editingCourse.courseImg?.url || 'None'}
                    </p>
                  )}
                </div>
                <div className="course-actions">
                  <Button type="submit" variant="primary">
                    {editingCourse ? 'Update Course' : 'Create Course'}
                  </Button>
                  <Button type="button" variant="secondary" onClick={resetForm}>
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Courses;