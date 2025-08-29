import { useState, useEffect } from 'react';
import { ProgressBar } from 'react-bootstrap';

function CountdownTimer({ initialTime, onComplete }) {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(intervalId);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (timeRemaining === 0 && typeof onComplete === 'function') {
      onComplete();
    }
  }, [timeRemaining, onComplete]);

  const progress = (timeRemaining / initialTime) * 100;

  return (
    <div style={{ width: '300px', margin: '20px auto' }}>
      {/* Numeric countdown */}
      <div style={{ textAlign: 'center', marginBottom: '5px', fontSize: '18px' }}>
        {timeRemaining}s
      </div>

      {/* Progress bar */}
      <ProgressBar
        variant="info"
        animated
        now={progress}
        label="" // leave blank because we show numeric countdown separately
        style={{ height: '20px' }}
      />
    </div>
  );
}

export default CountdownTimer;
