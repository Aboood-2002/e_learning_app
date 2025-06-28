import  { useState } from 'react';
import { Plus, Search, Edit2, Trash2, HelpCircle } from 'lucide-react';
import { mockQuizzes, mockCourses } from '../Data/mockData';
import Layout from '../components/layout/Layout';
import Button from '../components/common/Button';
import './main.css';

export default function Questions() {
  const [quizzes] = useState(mockQuizzes);
  const [courses] = useState(mockCourses);
  const [questions, setQuestions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCourse, setFilterCourse] = useState('');
  const [filterQuiz, setFilterQuiz] = useState('');

  const [formData, setFormData] = useState({
    quizId: '',
    questionText: '',
    options: ['', '', '', ''], // Four options by default
    correctAnswer: 0,
    points: 10
  });

  const filteredQuestions = questions.filter(question => {
    const matchesSearch = question.questionText.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = filterCourse === '' || 
      quizzes.find(q => q.id === question.quizId)?.courseId === filterCourse;
    const matchesQuiz = filterQuiz === '' || question.quizId === filterQuiz;
    return matchesSearch && matchesCourse && matchesQuiz;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingQuestion) {
      setQuestions(questions.map(question => 
        question.id === editingQuestion.id 
          ? { ...question, ...formData }
          : question
      ));
    } else {
      const newQuestion = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date()
      };
      setQuestions([...questions, newQuestion]);
    }
    
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      quizId: '',
      questionText: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      points: 10
    });
    setEditingQuestion(null);
    setShowModal(false);
  };

  const handleEdit = (question) => {
    setEditingQuestion(question);
    setFormData({
      quizId: question.quizId,
      questionText: question.questionText,
      options: question.options,
      correctAnswer: question.correctAnswer,
      points: question.points
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      setQuestions(questions.filter(question => question.id !== id));
    }
  };

  const getQuizTitle = (quizId) => {
    const quiz = quizzes.find(q => q.id === quizId);
    return quiz ? quiz.title : 'Unknown Quiz';
  };

  const getCourseTitle = (quizId) => {
    const quiz = quizzes.find(q => q.id === quizId);
    const course = courses.find(c => c.id === quiz?.courseId);
    return course ? course.title : 'Unknown Course';
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData({ ...formData, options: newOptions });
  };

  return (
    <Layout>
      <div className="courses-page">
        <div className="page-header">
          <h1 className="heading">Questions</h1>
          <Button
            variant="primary"
            onClick={() => setShowModal(true)}
          >
            <Plus className="icon" />
            Add Question
          </Button>
        </div>

        {/* Filters */}
        <div className="course-actions">
          <div className="form-group">
            <label htmlFor="search" className="sr-only">Search questions</label>
            <div className="search-container">
              <Search className="search-icon" />
              <input
                type="text"
                id="search"
                placeholder="Search questions..."
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
          <div className="form-group">
            <label htmlFor="quizFilter" className="sr-only">Filter by quiz</label>
            <select
              id="quizFilter"
              value={filterQuiz}
              onChange={(e) => setFilterQuiz(e.target.value)}
              className="form-input"
            >
              <option value="">All Quizzes</option>
              {quizzes
                .filter(q => filterCourse === '' || q.courseId === filterCourse)
                .map(quiz => (
                  <option key={quiz.id} value={quiz.id}>{quiz.title}</option>
                ))}
            </select>
          </div>
        </div>

        {/* Questions List */}
        <div className="card">
          <div className="card-header">
            <h3 className="heading">All Questions ({filteredQuestions.length})</h3>
          </div>
          <div className="lesson-list">
            {filteredQuestions.map((question) => (
              <div key={question.id} className="lesson-item">
                <div className="lesson-content">
                  <div className="lesson-title">
                    <HelpCircle className="icon text-blue" />
                    <h4 className="heading">{question.questionText}</h4>
                    <span className="badge badge-order">{question.points} points</span>
                  </div>
                  <div className="quiz-meta">
                    <div className="meta-item">
                      Course: {getCourseTitle(question.quizId)}
                    </div>
                    <div className="meta-item">
                      Quiz: {getQuizTitle(question.quizId)}
                    </div>
                    <div className="meta-item">
                      Correct Answer: {question.options[question.correctAnswer] || 'Not set'}
                    </div>
                  </div>
                  <div className="text-secondary text-sm">
                    Options: {question.options.filter(opt => opt).join(', ')}
                  </div>
                </div>
                <div className="course-actions">
                  <Button
                    variant="secondary"
                    onClick={() => handleEdit(question)}
                  >
                    <Edit2 className="icon" />
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(question.id)}
                  >
                    <Trash2 className="icon" />
                  </Button>
                </div>
              </div>
            ))}
            {filteredQuestions.length === 0 && (
              <div className="empty-state">
                <HelpCircle className="icon-large text-gray" />
                <p className="text-secondary">No questions found. Create your first question to get started.</p>
              </div>
            )}
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="modal-overlay">
            <div className="course-form-container modal-content">
              <h2 className="heading">{editingQuestion ? 'Edit Question' : 'Add New Question'}</h2>
              <form onSubmit={handleSubmit} className="course-form">
                <div className="form-group">
                  <label htmlFor="quizId">Quiz</label>
                  <select
                    id="quizId"
                    value={formData.quizId}
                    onChange={(e) => setFormData({ ...formData, quizId: e.target.value })}
                    required
                    className="form-input"
                  >
                    <option value="">Select a quiz</option>
                    {quizzes
                      .filter(q => filterCourse === '' || q.courseId === filterCourse)
                      .map(quiz => (
                        <option key={quiz.id} value={quiz.id}>{quiz.title}</option>
                      ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="questionText">Question Text</label>
                  <textarea
                    id="questionText"
                    rows={3}
                    value={formData.questionText}
                    onChange={(e) => setFormData({ ...formData, questionText: e.target.value })}
                    required
                    className="form-input"
                  />
                </div>
                {[0, 1, 2, 3].map(index => (
                  <div key={index} className="form-group">
                    <label htmlFor={`option${index}`}>Option {index + 1}</label>
                    <input
                      type="text"
                      id={`option${index}`}
                      value={formData.options[index]}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                      required
                      className="form-input"
                    />
                  </div>
                ))}
                <div className="form-group">
                  <label htmlFor="correctAnswer">Correct Answer</label>
                  <select
                    id="correctAnswer"
                    value={formData.correctAnswer}
                    onChange={(e) => setFormData({ ...formData, correctAnswer: Number(e.target.value) })}
                    required
                    className="form-input"
                  >
                    {formData.options.map((option, index) => (
                      <option key={index} value={index} disabled={!option}>
                        {option || `Option ${index + 1} (empty)`}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="points">Points</label>
                  <input
                    type="number"
                    id="points"
                    min="1"
                    value={formData.points}
                    onChange={(e) => setFormData({ ...formData, points: Number(e.target.value) })}
                    required
                    className="form-input"
                  />
                </div>
                <div className="course-actions">
                  <Button type="submit" variant="primary">
                    {editingQuestion ? 'Update Question' : 'Create Question'}
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