import { useState, useEffect } from 'react';
import Timer from './Timer';
import QuestionCard from './QuestionCard';
import ProgressBar from './ProgressBar';
import Results from './Results';
import { ChevronRight, ChevronLeft, Play, Edit3, LogOut } from 'lucide-react';
import './Quiz.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions, fetchSingleQuiz, fetchSingleCourse, fetchUserCourses, submitQuizScore } from '../redux/apiCalls/courseApiCall';
import { useNavigate, useParams } from 'react-router-dom';

const Quiz = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { courseId, quizId } = useParams();
  const { questions, quiz, course, userCourses, loading, error, quizScoreSubmitted } = useSelector((state) => state.course);
  const { user } = useSelector((state) => state.auth);

  // State to track if all data is loaded
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    if (user && courseId && quizId) {
      // Dispatch all API calls concurrently
      Promise.all([
        dispatch(fetchUserCourses()),
        dispatch(fetchSingleCourse(courseId)),
        dispatch(fetchSingleQuiz(quizId, courseId)),
        dispatch(fetchQuestions(quizId)),
      ]).then(() => {
        setIsDataLoaded(true); // Set when all API calls complete
      }).catch(() => {
        setIsDataLoaded(true); // Set even on error to show error message
      });
    }
  }, [dispatch, courseId, quizId, user]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isLocked, setIsLocked] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(quiz?.duration ? quiz.duration * 60 : 300);
  const [userAnswers, setUserAnswers] = useState({});
  const [showQuitConfirm, setShowQuitConfirm] = useState(false);

  const enrollment = userCourses.find((e) => e.course._id === courseId);

  const timeUsed = quiz?.duration ? (quiz.duration * 60 - timeLeft) : (300 - timeLeft);

  // Move score submission to functions, not useEffect (see Step 2)
  // Removed: useEffect for score submission

  const currentQuestion = questions[currentQuestionIndex];
  const TOTAL_TIME = quiz?.duration ? quiz.duration * 60 : 300;

  if (!user) {
    navigate('/login');
    return null;
  }

  if (!isDataLoaded) {
    return <div className="quiz-container"><p>Loading quiz...</p></div>;
  }

  if (error) {
    return <div className="quiz-container"><p className="text-red-500">{error}</p></div>;
  }

  if (!quiz || !course || !questions || !enrollment) {
    return <div className="quiz-container"><p>Quiz, course, or enrollment not found.</p></div>;
  }

  const startQuiz = () => {
    setHasStarted(true);
    setIsTimerActive(true);
  };

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    setIsLocked(true);
    setUserAnswers((prev) => ({ ...prev, [currentQuestionIndex]: answerIndex }));
    if (answerIndex === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleEditAnswer = () => {
    setIsLocked(false);
    const previousAnswer = userAnswers[currentQuestionIndex];
    if (previousAnswer !== undefined && previousAnswer === currentQuestion.correctAnswer) {
      setScore((prev) => prev - 1);
    }
  };

  const handleQuitQuiz = () => {
    setShowQuitConfirm(true);
  };

  const confirmQuit = () => {
    setIsTimerActive(false);
    setShowResults(true);
    setShowQuitConfirm(false);
    if (enrollment && quizId && !quizScoreSubmitted) {
      dispatch(submitQuizScore(enrollment._id, quizId, score, timeUsed));
    }
  };

  const cancelQuit = () => {
    setShowQuitConfirm(false);
  };

  const handleTimeUp = () => {
    setIsTimerActive(false);
    setShowResults(true);
    if (enrollment && quizId && !quizScoreSubmitted) {
      dispatch(submitQuizScore(enrollment._id, quizId, score, timeUsed));
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(userAnswers[currentQuestionIndex + 1] || null);
      setIsLocked(!!userAnswers[currentQuestionIndex + 1]);
    } else {
      setIsTimerActive(false);
      setShowResults(true);
      if (enrollment && quizId && !quizScoreSubmitted) {
        dispatch(submitQuizScore(enrollment._id, quizId, score, timeUsed));
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setSelectedAnswer(userAnswers[currentQuestionIndex - 1] || null);
      setIsLocked(!!userAnswers[currentQuestionIndex - 1]);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsLocked(false);
    setScore(0);
    setShowResults(false);
    setIsTimerActive(false);
    setHasStarted(false);
    setTimeLeft(quiz?.duration ? quiz.duration * 60 : 300);
    setUserAnswers({});
    setShowQuitConfirm(false);
   // dispatch(courseActions.setQuizScoreSubmitted(null));
  };

  // Rest of the component (start screen, results, quiz UI) remains unchanged
  if (!hasStarted) {
    return (
      <div className="quiz-start-container">
        <div className="start-card">
          <div className="start-header">
            <div className="start-icon">
              <Play className="play-icon" />
            </div>
            <h1 className="start-title">{quiz.title || 'Quiz'}</h1>
            <p className="start-subtitle">Test your knowledge with our timed quiz!</p>
          </div>
          <div className="quiz-rules">
            <h3 className="rules-title">Quiz Rules:</h3>
            <ul className="rules-list">
              <li>• <b>{questions.length || 0}</b> questions total</li>
              <li>• <b>{quiz.duration || 5}</b> minutes for the entire quiz</li>
              <li>• You can navigate between questions</li>
              <li>• Answers are saved automatically</li>
              <li>• Correct answers shown only at the end</li>
              <li>• You can edit your answers anytime</li>
              <li>• You can quit the quiz early if needed</li>
            </ul>
          </div>
          <button onClick={startQuiz} className="start-button">Start Quiz</button>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="quiz-results-container">
        <Results
          score={score}
          total={questions.length}
          onRestart={restartQuiz}
          totalTime={timeLeft}
          userAnswers={userAnswers}
          questions={questions}
          quizId={quizId}
          courseId={courseId}
          quiz={quiz}
        />
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className="quiz-content">
        <div className="quiz-header">
          <div className="quiz-header-top">
            <h1 className="quiz-title">{quiz.title || 'Quiz Challenge'}</h1>
            <button onClick={handleQuitQuiz} className="quit-button">
              <LogOut className="quit-icon" /> Quit Quiz
            </button>
          </div>
          <ProgressBar current={currentQuestionIndex + 1} total={questions.length} />
          <Timer
            totalTime={TOTAL_TIME}
            onTimeUp={handleTimeUp}
            isActive={isTimerActive}
            onTick={setTimeLeft}
          />
        </div>
        <QuestionCard
          question={currentQuestion}
          selectedAnswer={selectedAnswer}
          onAnswerSelect={handleAnswerSelect}
          showCorrect={false}
          isLocked={isLocked}
        />
        {isLocked && (
          <div className="edit-answer-container">
            <button onClick={handleEditAnswer} className="edit-button">
              <Edit3 className="edit-icon" /> Edit Answer
            </button>
          </div>
        )}
        <div className="navigation-container">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="nav-button nav-button-prev"
          >
            <ChevronLeft className="nav-icon" /> Previous
          </button>
          <div className="question-indicator">
            Question {currentQuestionIndex + 1} of {questions.length}
          </div>
          <button
            onClick={handleNext}
            disabled={currentQuestionIndex === questions.length - 1 && !isLocked}
            className="nav-button nav-button-next"
          >
            Next <ChevronRight className="nav-icon" />
          </button>
        </div>
      </div>
      {showQuitConfirm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="modal-title">Quit Quiz?</h3>
            <p className="modal-message">
              Are you sure you want to quit the quiz? Your current progress will be saved and you'll see your results.
            </p>
            <div className="modal-buttons">
              <button onClick={cancelQuit} className="modal-button cancel">Continue Quiz</button>
              <button onClick={confirmQuit} className="modal-button confirm">Quit & See Results</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;