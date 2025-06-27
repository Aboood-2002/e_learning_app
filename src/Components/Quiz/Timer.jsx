import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import './Timer.css';

const Timer = ({ totalTime, onTimeUp, isActive, onTick }) => {
  const [timeLeft, setTimeLeft] = useState(totalTime);

  // Reset timeLeft when totalTime changes (e.g., quiz reload or restart)
  useEffect(() => {
    setTimeLeft(totalTime);
  }, [totalTime]);

  // Timer interval
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive]);

  // Notify parent of time updates and handle time-up
  useEffect(() => {
    onTick?.(timeLeft);
    if (timeLeft <= 0 && isActive) {
      onTimeUp();
    }
  }, [timeLeft, isActive, onTimeUp, onTick]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const percentage = totalTime > 0 ? (timeLeft / totalTime) * 100 : 0;
  const isLowTime = timeLeft <= 60;
  const isCriticalTime = timeLeft <= 30;

  return (
    <div className="timer-container">
      <div className="timer-display">
        <Clock className={`timer-icon ${isCriticalTime ? 'critical' : isLowTime ? 'warning' : 'normal'}`} />
        <span className={`timer-text ${isCriticalTime ? 'critical pulse' : isLowTime ? 'warning' : 'normal'}`}>
          {formatTime(timeLeft)}
        </span>
      </div>

      <div className="timer-bar-container">
        <div
          className={`timer-bar ${isCriticalTime ? 'critical' : isLowTime ? 'warning' : 'normal'}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default Timer;