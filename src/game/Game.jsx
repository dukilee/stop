import './Game.css';
import InputQuestion from '../InputQuestion';
import { useRef, useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { QuestionType, verify, name} from '../InputQuestionType';
import { getBackendUrl } from '../Server';

const TIMER_IN_SECONDS = 5;

function Game({username}) {
  const socketRef = useRef(null);
  const [complete, updateComplete] = useState(true);
  const [timeLeft, setTimeLeft] = useState(TIMER_IN_SECONDS); // seconds
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null); // to keep track of the interval ID
  const [questionTypes, updateQuestionTypes] = useState([QuestionType.DOUBLE, QuestionType.TRIPLE, QuestionType.ADD_TEN, QuestionType.SUCCESSOR, QuestionType.SQUARED]);
  const answers = useRef(new Array(questionTypes.length).fill(null));
  const correct = useRef(new Array(questionTypes.length).fill(null));
  const [selectedNumber, updateSelectedNumber] = useState(19);
  const [isConnected, setIsConnected] = useState(false);
  const hasSentpayload = useRef(false);

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
    if(hasSentpayload.current) return;
    hasSentpayload.current = true;

    for(let i = 0; i<questionTypes.length; i++){
      correct.current[i] = verify(selectedNumber, answers.current[i], questionTypes[i])
    }
    const payload = {
      'name': username,
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
    const backendUrl = getBackendUrl();
    console.log('Trying to connect to '+backendUrl+'...');
    socketRef.current = io(backendUrl, {
      transports: ['websocket'],
    });

    socketRef.current.on('connect', () => { setIsConnected(true); console.log('✅ Connected to server');});
    socketRef.current.on('connect_error', (err) => { if(isConnected) {setIsConnected(false);} });
    socketRef.current.on('disconnect', (reason) => { if(isConnected) {setIsConnected(false);} });

    socketRef.current.on('getAnswers', (data) => {
      startTimer();
    });

    socketRef.current.on('nextNumber', (data) => {
      updateSelectedNumber(data.val);
      answers.current = new Array(data.questionTypes.length).fill(null);
      correct.current = new Array(data.questionTypes.length).fill(null);
      updateQuestionTypes(data.questionTypes);
      updateComplete(false);
      setTimeLeft(TIMER_IN_SECONDS);
      hasSentpayload.current = false;
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
      socketRef.current.emit('finished', {});
      sendAnswersToServer();
      updateComplete(true);
    }
  }
  console.log(complete)

  if(!isConnected){
    return <div>
      <h1>DISCONNECTED FROM SERVER</h1>
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
          <InputQuestion
            key={index}
            questionId={index}
            questionType={questionTypes[index]}
            updateAnswer={updateAnswer}
            selectedNumber={selectedNumber}
            display={complete?correct.current[index]:null}
          />
        ))}
      </div>
      <div>
        <button className="octagon-btn" onClick={stopClicked}>STOP</button>
      </div>
    </div>
  }
}

export default Game;
