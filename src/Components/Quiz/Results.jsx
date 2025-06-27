import { Trophy, RotateCcw, Star, Clock, CheckCircle, XCircle } from 'lucide-react';
import './Results.css';
import { useSelector } from 'react-redux';

const Results = ({ score, total, onRestart, totalTime, userAnswers, questions ,quiz}) => {
  const { quizScoreSubmitted, error } = useSelector((state) => state.course);

  const percentage = Math.round((score / total) * 100);

  const getGrade = () => {
    if (percentage >= 90) return { grade: 'A+', color: 'grade-excellent', message: 'Outstanding!' };
    if (percentage >= 80) return { grade: 'A', color: 'grade-good', message: 'Excellent!' };
    if (percentage >= 70) return { grade: 'B', color: 'grade-average', message: 'Good job!' };
    if (percentage >= 60) return { grade: 'C', color: 'grade-below', message: 'Not bad!' };
    return { grade: 'F', color: 'grade-poor', message: 'Keep trying!' };
  };

  const { grade, color, message } = getGrade();

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const timeUsed = quiz?.duration * 60 - totalTime;

  return (
    <div className="results-container">
      <div className="results-header">
        <Trophy className={`results-trophy ${color}`} />
        <h2 className="results-title">Quiz Complete!</h2>
        <p className={`results-message ${color}`}>{message}</p>
      </div>

      <div className="results-score">
        <div className={`score-percentage ${color}`}>
          {percentage}%
        </div>
        <div className="score-details">
          {score} out of {total} correct
        </div>
        <div className={`score-grade ${color}`}>
          Grade: {grade}
        </div>
      </div>

      {quizScoreSubmitted ? (
        <p className="text-green-500">Score submitted successfully!</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <p>Saving score...</p>
      )}

      <div className="results-progress">
        <div
          className={`results-progress-bar ${
            percentage >= 80 ? 'progress-excellent' :
            percentage >= 60 ? 'progress-good' :
            percentage >= 40 ? 'progress-average' : 'progress-poor'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="results-stats">
        <div className="stat-item">
          <Clock className="stat-icon stat-icon-blue" />
          <div className="stat-label">Time Used</div>
          <div className="stat-value">{formatTime(timeUsed)}</div>
        </div>
        <div className="stat-item">
          <Star className="stat-icon stat-icon-purple" />
          <div className="stat-label">Avg per Question</div>
          <div className="stat-value">{formatTime(Math.round(timeUsed / total))}</div>
        </div>
      </div>

      <div className="question-review">
        <h3 className="review-title">Question Review</h3>
        <div className="review-list">
          {questions.map((question, index) => {
            const userAnswer = userAnswers[index];
            const isCorrect = userAnswer === question.correctAnswer;

            return (
              <div key={index} className="review-item">
                <div className="review-header">
                  <span className="review-number">Q{index + 1}</span>
                  {isCorrect ? (
                    <CheckCircle className="review-icon correct" />
                  ) : (
                    <XCircle className="review-icon incorrect" />
                  )}
                </div>
                <div className="review-question">{question.question}</div>
                <div className="review-answers">
                  {userAnswer !== undefined && (
                    <div className={`review-answer ${isCorrect ? 'correct' : 'incorrect'}`}>
                      Your answer: {question.options[userAnswer]}
                    </div>
                  )}
                  {!isCorrect && (
                    <div className="review-answer correct">
                      Correct answer: {question.options[question.correctAnswer]}
                    </div>
                  )}
                  {userAnswer === undefined && (
                    <div className="review-answer unanswered">
                      Not answered - Correct: {question.options[question.correctAnswer]}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <button onClick={onRestart} className="restart-button">
        <RotateCcw className="restart-icon" />
        <span>Try Again</span>
      </button>
    </div>
  );
};

export default Results;