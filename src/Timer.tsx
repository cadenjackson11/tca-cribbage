import React, { useState, useEffect } from 'react';

interface TimerProps {
  initialTime: number;
  
}

export const Timer: React.FC<TimerProps> = ({ initialTime }) => {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isRunning) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setTime(initialTime);
    setIsRunning(false);
  };

    const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <div>
      <h1 className='ml-12'>{formatTime(time)}</h1>
        <button onClick={startTimer} disabled={isRunning} className='m-1 bg-success rounded-box p-1.5'>
          Start
        </button>
        <button onClick={stopTimer} disabled={!isRunning} className='mr-1 bg-error rounded-box p-1.5'>
          Stop
        </button>
        <button onClick={resetTimer} className='bg-warning rounded-box p-1.5'>Reset</button>
    </div>
  );
};

export default Timer;