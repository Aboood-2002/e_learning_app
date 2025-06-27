import './QuestionCard.css';

const QuestionCard = ({ question, selectedAnswer, onAnswerSelect, showCorrect, isLocked }) => {
  const getOptionClass = (index) => {
    let className = "option";
    
    if (!isLocked) {
      className += " option-interactive";
    }
    
    // Only show selected answer styling, never show correct/wrong during quiz
    if (selectedAnswer === index && !showCorrect) {
      className += " option-selected";
    }
    
    // Only show correct/wrong when showCorrect is true (at quiz end)
    if (showCorrect) {
      if (selectedAnswer === index) {
        if (index === question.correctAnswer) {
          className += " option-correct";
        } else {
          className += " option-wrong";
        }
      } else if (index === question.correctAnswer) {
        className += " option-correct";
      } else if (isLocked) {
        className += " option-disabled";
      }
    } else if (isLocked && selectedAnswer !== index) {
      className += " option-disabled";
    }
    
    return className;
  };

  return (
    <div className="question-card">
      <h2 className="question-title">
        {question.name}
      </h2>
      
      <div className="options-container">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => !isLocked && onAnswerSelect(index)}
            disabled={isLocked}
            className={getOptionClass(index)}
          >
            <div className="option-content">
              <div className="option-letter">
                {String.fromCharCode(65 + index)}
              </div>
              <span className="option-text">{option}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;