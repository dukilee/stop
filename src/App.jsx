import './App.css';
import InputQuestion from './InputQuestion';
import { useRef, useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { QuestionType, verify, name} from './InputQuestionType';

const TIMER_IN_SECONDS = 5;

function App() {
  const socketRef = useRef(null);
  const [complete, updateComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIMER_IN_SECONDS); // seconds
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null); // to keep track of the interval ID
  const [questionTypes, updateQuestionTypes] = useState([QuestionType.DOUBLE, QuestionType.TRIPLE, QuestionType.ADD_TEN, QuestionType.SUCCESSOR, QuestionType.SQUARED]);
  const answers = useRef(new Array(questionTypes.length).fill(null));
  const correct = useRef(new Array(questionTypes.length).fill(null));
  const [selectedNumber, updateSelectedNumber] = useState(19);

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
    const payload = {
      'name': 'Guilherme',
      'answers': answers.current,
      'correct': correct.current,
    };
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

    socketRef.current.on('nextNumber', (data) => {
      updateSelectedNumber(data.val);
      console.log(data.questionTypes);
      updateQuestionTypes(data.questionTypes);
    })

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  //APP
  const updateAnswer = (id, selection) => {
    answers.current[id] = selection;
  }

  const stopClicked = () => {
    if(!answers.current.includes(null)){
      for(let i = 0; i<questionTypes.length; i++){
        correct.current[i] = verify(selectedNumber, answers.current[i], questionTypes[i])
      }
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
      <div className="selected-number">
        {selectedNumber}
      </div>
      <div>
        {[...Array(questionTypes.length)].map((_, index) => (
          <InputQuestion key={index} questionId={index} questionType={questionTypes[index]} updateAnswer={updateAnswer} selectedNumber={selectedNumber} />
        ))}
      </div>
      <div>
        <button className="octagon-btn" onClick={stopClicked}>Click Me</button>
      </div>
    </div>
  }
}

export default App;
