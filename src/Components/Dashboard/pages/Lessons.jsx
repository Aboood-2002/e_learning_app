import  { useState } from 'react';
import { Plus, Search, Edit2, Trash2, PlayCircle, Clock, BookOpen } from 'lucide-react';
import { mockLessons, mockCourses } from '../Data/mockData';
import Layout from '../components/layout/Layout';
import Button from '../components/common/Button';
import './main.css';

export default function Lessons() {
  const [lessons, setLessons] = useState(mockLessons);
  const [courses] = useState(mockCourses);
  const [showModal, setShowModal] = useState(false);
  const [editingLesson, setEditingLesson] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCourse, setFilterCourse] = useState('');

  const [formData, setFormData] = useState({
    courseId: '',
    title: '',
    description: '',
    duration: '',
    order: 1,
    content: '',
    videoUrl: ''
  });

  const filteredLessons = lessons.filter(lesson => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = filterCourse === '' || lesson.courseId === filterCourse;
    return matchesSearch && matchesCourse;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingLesson) {
      setLessons(lessons.map(lesson => 
        lesson.id === editingLesson.id 
          ? { ...lesson, ...formData }
          : lesson
      ));
    } else {
      const newLesson = {
        id: Date.now().toString(),
        ...formData,
        isCompleted: false,
        createdAt: new Date()
      };
      setLessons([...lessons, newLesson]);
    }
    
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      courseId: '',
      title: '',
      description: '',
      duration: '',
      order: 1,
      content: '',
      videoUrl: ''
    });
    setEditingLesson(null);
    setShowModal(false);
  };

  const handleEdit = (lesson) => {
    setEditingLesson(lesson);
    setFormData({
      courseId: lesson.courseId,
      title: lesson.title,
      description: lesson.description,
      duration: lesson.duration,
      order: lesson.order,
      content: lesson.content,
      videoUrl: lesson.videoUrl || ''
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this lesson?')) {
      setLessons(lessons.filter(lesson => lesson.id !== id));
    }
  };

  const getCourseTitle = (courseId) => {
    const course = courses.find(c => c.id === courseId);
    return course ? course.title : 'Unknown Course';
  };

  return (
    <Layout>
      <div className="courses-page">
        <div className="page-header">
          <h1 className="heading">Lessons</h1>
          <Button
            variant="primary"
            onClick={() => setShowModal(true)}
          >
            <Plus className="icon" />
            Add Lesson
          </Button>
        </div>

        {/* Filters */}
        <div className="course-actions">
          <div className="form-group">
            <label htmlFor="search" className="sr-only">Search lessons</label>
            <div className="search-container">
              <Search className="search-icon" />
              <input
                type="text"
                id="search"
                placeholder="Search lessons..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input search-input"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="courseFilter" className="sr-only">Filter by course</label>
            <select
              id="courseFilter"
              value={filterCourse}
              onChange={(e) => setFilterCourse(e.target.value)}
              className="form-input"
            >
              <option value="">All Courses</option>
              {courses.map(course => (
                <option key={course.id} value={course.id}>{course.title}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Lessons List */}
        <div className="card">
          <div className="card-header">
            <h3 className="heading">All Lessons ({filteredLessons.length})</h3>
          </div>
          <div className="lesson-list">
            {filteredLessons.map((lesson) => (
              <div key={lesson.id} className="lesson-item">
                <div className="lesson-content">
                  <div className="lesson-title">
                    <PlayCircle className="icon text-blue" />
                    <h4 className="heading">{lesson.title}</h4>
                    <span className="badge badge-order">Order {lesson.order}</span>
                  </div>
                  <p className="text-secondary">{lesson.description}</p>
                  <div className="lesson-meta">
                    <div className="meta-item">
                      <BookOpen className="icon" />
                      {getCourseTitle(lesson.courseId)}
                    </div>
                    <div className="meta-item">
                      <Clock className="icon" />
                      {lesson.duration}
                    </div>
                  </div>
                  {lesson.videoUrl && (
                    <div className="text-blue">
                      Video: {lesson.videoUrl}
                    </div>
                  )}
                </div>
                <div className="course-actions">
                  <Button
                    variant="secondary"
                    onClick={() => handleEdit(lesson)}
                  >
                    <Edit2 className="icon" />
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(lesson.id)}
                  >
                    <Trash2 className="icon" />
                  </Button>
                </div>
              </div>
            ))}
            {filteredLessons.length === 0 && (
              <div className="empty-state">
                <PlayCircle className="icon-large text-gray" />
                <p className="text-secondary">No lessons found. Create your first lesson to get started.</p>
              </div>
            )}
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="modal-overlay">
            <div className="course-form-container modal-content">
              <h2 className="heading">{editingLesson ? 'Edit Lesson' : 'Add New Lesson'}</h2>
              <form onSubmit={handleSubmit} className="course-form">
                <div className="form-group">
                  <label htmlFor="courseId">Course</label>
                  <select
                    id="courseId"
                    value={formData.courseId}
                    onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
                    required
                    className="form-input"
                  >
                    <option value="">Select a course</option>
                    {courses.map(course => (
                      <option key={course.id} value={course.id}>{course.title}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-group grid grid-cols-2">
                  <div className="form-group">
                    <label htmlFor="duration">Duration</label>
                    <input
                      type="text"
                      id="duration"
                      placeholder="e.g., 45 min"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      required
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="order">Order</label>
                    <input
                      type="number"
                      id="order"
                      min="1"
                      value={formData.order}
                      onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                      required
                      className="form-input"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="videoUrl">Video URL (optional)</label>
                  <input
                    type="url"
                    id="videoUrl"
                    value={formData.videoUrl}
                    onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="content">Content</label>
                  <textarea
                    id="content"
                    rows={4}
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    required
                    className="form-input"
                  />
                </div>
                <div className="course-actions">
                  <Button type="submit" variant="primary">
                    {editingLesson ? 'Update Lesson' : 'Create Lesson'}
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
}