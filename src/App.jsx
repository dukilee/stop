import './App.css';
import Question from './Question';
import {useRef, useState, useEffect} from 'react';
import { io } from 'socket.io-client';
import questionsData from './Questions.json';

const NUMBER_OF_QUESTIONS = 5;

function App() {
  //SERVER
  const socketRef = useRef(null);
  const answers = useRef(new Array(NUMBER_OF_QUESTIONS).fill(null));
  const [complete, updateComplete] = useState(false);

  const sendAnswersToServer = () => {
    const payload = answers.current;
    socketRef.current.emit('answers', payload);
    console.log('📤 Sending answers:', payload);
  }
  console.log('I shall connect to ' + import.meta.env.VITE_SOCKET_URL);

  useEffect(() => {
    // socketRef.current = io('https://stop-server.onrender.com/', {
    //   transports: ['websocket'],
    // });
    // socketRef.current = io('http://127.0.0.1:3001', {
    //   transports: ['websocket'],
    // });
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
      updateComplete(true);
      console.log('📩 Received update from server:', data);
      sendAnswersToServer();
      alert(`Another user pressed the button! (${JSON.stringify(data)})`);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  //APP
  console.log(questionsData);
  const updateAnswer = (id, selection) => {
    answers.current[id] = selection;
    console.log(answers.current);
    if(! answers.current.includes(null)){
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
      {[...Array(NUMBER_OF_QUESTIONS)].map((_, index) => (
        <Question questionId={index} onAnswer={updateAnswer} questionData={questionsData.questions[index]} />
      ))}
    </div>
  }
}

export default App;
