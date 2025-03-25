import './App.css';
import Question from './Question';
import { useRef, useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import questionsData from './Questions.json';

const NUMBER_OF_QUESTIONS = 5;
const TIMER_IN_SECONDS = 5;

function App() {
  const socketRef = useRef(null);
  const answers = useRef(new Array(NUMBER_OF_QUESTIONS).fill(null));
  const [complete, updateComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIMER_IN_SECONDS); // seconds
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null); // to keep track of the interval ID

  //TIMER
  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setIsRunning(false); // stop running
          onTimerEnd();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const startTimer = () => {
    if (isRunning) return; // avoid stacking intervals
    setTimeLeft(TIMER_IN_SECONDS);         // reset the time
    setIsRunning(true);     // start the timer
  };


  //SERVER
  const sendAnswersToServer = () => {
    const payload = answers.current;
    socketRef.current.emit('answers', payload);
  }

  const onTimerEnd = () => {
    sendAnswersToServer();
    updateComplete(true);
  };

  useEffect(() => {
    console.log('Trying to connect to '+import.meta.env.VITE_SOCKET_URL+'...');
    socketRef.current = io(import.meta.env.VITE_SOCKET_URL, {
      transports: ['websocket'],
    });

    socketRef.current.on('connect', () => {
      console.log('✅ Connected to server');
    });

    socketRef.current.on('connect_error', (err) => {
      console.error('❌ Connection error:', err.message);
    });

    socketRef.current.on('disconnect', (reason) => {
      console.warn('⚠️ Disconnected:', reason);
    });

    socketRef.current.on('getAnswers', (data) => {
      startTimer();
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  //APP
  const updateAnswer = (id, selection) => {
    answers.current[id] = selection;
    if(!answers.current.includes(null)){
      socketRef.current.emit('finished', {});
      sendAnswersToServer();
      updateComplete(true);
    }
  }

  if(complete){
    return <div>
      <h1>Finished brah </h1>
    </div>
  }else{
    return <div>
      <div className="timer-container">
        <div
          className="timer-bar"
          style={{ width: `${((timeLeft - 1) / (TIMER_IN_SECONDS - 1)) * 100}%` }}
        ></div>
      </div>
      <div>
        {[...Array(NUMBER_OF_QUESTIONS)].map((_, index) => (
          <Question questionId={index} onAnswer={updateAnswer} questionData={questionsData.questions[index]} />
        ))}
      </div>
    </div>
  }
}

export default App;
