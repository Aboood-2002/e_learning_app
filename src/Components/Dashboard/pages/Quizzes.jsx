import Layout from '../components/layout/Layout';
import Card from '../components/common/Card';
// import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import { mockQuizzes } from '../Data/mockData';
import './main.css'
import { Plus, Search, Edit2, Trash2, FileQuestion, Clock, Target, Users } from 'lucide-react';
import { useState } from 'react';
import { mockCourses } from '../Data/mockData'; // Adjust the import path as necessary

export default function Quizzes() {
  const [quizzes, setQuizzes] = useState(mockQuizzes);
  const [courses] = useState(mockCourses);
  const [showModal, setShowModal] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCourse, setFilterCourse] = useState('');

  const [formData, setFormData] = useState({
    courseId: '',
    title: '',
    description: '',
    timeLimit: 30,
    passingScore: 70,
    attempts: 3,
    isActive: true
  });

  const filteredQuizzes = quizzes.filter(quiz => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = filterCourse === '' || quiz.courseId === filterCourse;
    return matchesSearch && matchesCourse;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingQuiz) {
      setQuizzes(quizzes.map(quiz => 
        quiz.id === editingQuiz.id 
          ? { ...quiz, ...formData }
          : quiz
      ));
    } else {
      const newQuiz = {
        id: Date.now().toString(),
        ...formData,
        questions: [],
        lessonId: undefined,
        createdAt: new Date()
      };
      setQuizzes([...quizzes, newQuiz]);
    }
    
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      courseId: '',
      title: '',
      description: '',
      timeLimit: 30,
      passingScore: 70,
      attempts: 3,
      isActive: true
    });
    setEditingQuiz(null);
    setShowModal(false);
  };

  const handleEdit = (quiz) => {
    setEditingQuiz(quiz);
    setFormData({
      courseId: quiz.courseId,
      title: quiz.title,
      description: quiz.description,
      timeLimit: quiz.timeLimit,
      passingScore: quiz.passingScore,
      attempts: quiz.attempts,
      isActive: quiz.isActive
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this quiz?')) {
      setQuizzes(quizzes.filter(quiz => quiz.id !== id));
    }
  };

  const getCourseTitle = (courseId) => {
    const course = courses.find(c => c.id === courseId);
    return course ? course.title : 'Unknown Course';
  };

  const toggleQuizStatus = (id) => {
    setQuizzes(quizzes.map(quiz => 
      quiz.id === id 
        ? { ...quiz, isActive: !quiz.isActive }
        : quiz
    ));
  };

  return (
    <Layout>
      <div className="courses-page">
        <div className="page-header">
          <h1 className="heading">Quizzes</h1>
          <Button
            variant="primary"
            onClick={() => setShowModal(true)}
          >
            <Plus className="icon" />
            Add Quiz
          </Button>
        </div>

        {/* Filters */}
        <div className="course-actions">
          <div className="form-group">
            <label htmlFor="search" className="sr-only">Search quizzes</label>
            <div className="search-container">
              <Search className="search-icon" />
              <input
                type="text"
                id="search"
                placeholder="Search quizzes..."
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

        {/* Quizzes Grid */}
        <div className="grid grid-cols-3">
          {filteredQuizzes.map((quiz) => (
            <div key={quiz.id} className="card quiz-card">
              <div className="quiz-content">
                <div className="flex justify-between mb-4">
                  <h3 className="heading">{quiz.title}</h3>
                  <div className="course-actions">
                    <Button
                      variant="secondary"
                      onClick={() => handleEdit(quiz)}
                    >
                      <Edit2 className="icon" />
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(quiz.id)}
                    >
                      <Trash2 className="icon" />
                    </Button>
                  </div>
                </div>
                <p className="text-secondary">{quiz.description}</p>
                <div className="quiz-meta">
                  <div className="meta-item">
                    <FileQuestion className="icon" />
                    Course: {getCourseTitle(quiz.courseId)}
                  </div>
                  <div className="meta-item">
                    <Clock className="icon" />
                    {quiz.timeLimit} minutes
                  </div>
                  <div className="meta-item">
                    <Target className="icon" />
                    Passing score: {quiz.passingScore}%
                  </div>
                  <div className="meta-item">
                    <Users className="icon" />
                    {quiz.attempts} attempts
                  </div>
                </div>
                <div className="quiz-footer">
                  <span className={`badge ${quiz.isActive ? 'badge-active' : 'badge-inactive'}`}>
                    {quiz.isActive ? 'Active' : 'Inactive'}
                  </span>
                  <Button
                    variant={quiz.isActive ? 'danger' : 'success'}
                    onClick={() => toggleQuizStatus(quiz.id)}
                  >
                    {quiz.isActive ? 'Deactivate' : 'Activate'}
                  </Button>
                </div>
                <div className="text-secondary text-sm">
                  {quiz.questions.length} questions • Created {quiz.createdAt.toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
          {filteredQuizzes.length === 0 && (
            <div className="empty-state">
              <FileQuestion className="icon-large text-gray" />
              <p className="text-secondary">No quizzes found. Create your first quiz to get started.</p>
            </div>
          )}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="modal-overlay">
            <div className="course-form-container modal-content">
              <h2 className="heading">{editingQuiz ? 'Edit Quiz' : 'Add New Quiz'}</h2>
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
                    <label htmlFor="timeLimit">Time Limit (min)</label>
                    <input
                      type="number"
                      id="timeLimit"
                      min="1"
                      value={formData.timeLimit}
                      onChange={(e) => setFormData({ ...formData, timeLimit: Number(e.target.value) })}
                      required
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="passingScore">Passing Score (%)</label>
                    <input
                      type="number"
                      id="passingScore"
                      min="0"
                      max="100"
                      value={formData.passingScore}
                      onChange={(e) => setFormData({ ...formData, passingScore: Number(e.target.value) })}
                      required
                      className="form-input"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="attempts">Allowed Attempts</label>
                  <input
                    type="number"
                    id="attempts"
                    min="1"
                    value={formData.attempts}
                    onChange={(e) => setFormData({ ...formData, attempts: Number(e.target.value) })}
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="isActive" className="flex items-center">
                    <input
                      type="checkbox"
                      id="isActive"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="form-checkbox"
                    />
                    <span className="ml-2">Active (students can take this quiz)</span>
                  </label>
                </div>
                <div className="course-actions">
                  <Button type="submit" variant="primary">
                    {editingQuiz ? 'Update Quiz' : 'Create Quiz'}
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