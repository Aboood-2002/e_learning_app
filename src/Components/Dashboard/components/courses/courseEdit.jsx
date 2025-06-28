import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { fetchUserCourses } from '../../../redux/apiCalls/courseApiCall';
import Layout from '../Layout';
import Button from '../common/Button';
import '../../main.css';

const CourseEdit = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    title: '',
    level: 'Beginner',
    duration: '',
    price: '',
  });
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!user || !['instructor', 'admin'].includes(user.role)) {
      navigate('/login');
      return;
    }
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`/api/courses/${courseId}`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setFormData({
          title: response.data.title,
          level: response.data.level,
          duration: response.data.duration,
          price: response.data.price,
        });
      } catch (err) {
        setError('Failed to load course data.');
      }
    };
    fetchCourse();
  }, [user, courseId, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('level', formData.level);
    data.append('duration', formData.duration);
    data.append('price', formData.price);
    if (image) data.append('image', image);

    try {
      await axios.put(`/api/courses/${courseId}`, data, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setSuccess('Course updated successfully!');
      setError('');
      dispatch(fetchUserCourses());
      setTimeout(() => navigate('/studentCourses'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update course.');
      setSuccess('');
    }
  };

  if (!user) return null;

  return (
    <Layout>
      <div className="courses-page">
        <div className="page-header">
          <h1 className="heading">Edit Course</h1>
        </div>
        <div className="course-form-container">
          <h2 className="heading">Update Course</h2>
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
              <label htmlFor="image">Course Image</label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="form-input"
              />
            </div>
            <Button type="submit" variant="primary">
              Update Course
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CourseEdit;