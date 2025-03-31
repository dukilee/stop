import { io } from 'socket.io-client';
import { useRef, useState, useEffect } from 'react';
import ToggleTable from './ToggleTable';
import { QuestionType } from '../InputQuestionType';
import { getBackendUrl } from '../Server';

function AdminData(){
  const socketRef = useRef(null);
  const [number, updateNumber] = useState(19);
  useEffect(() => {
    const backendUrl = getBackendUrl();
    console.log('Trying to connect to '+backendUrl+'...');
    socketRef.current = io(backendUrl, {
      transports: ['websocket'],
    });

    socketRef.current.on('connect', () => {
      console.log('✅ Connected to server');
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const randomNumber = () => {
    return Math.floor(Math.random()*30 - 10);
  }

  const generateNumberAndEmitData = () => {
    const val = randomNumber();
    const questionTypes = Object.entries(questionTypesActive.current).filter(([key, value]) => value).map(([key])=>parseInt(key));
    console.log(questionTypes);
    updateNumber(val);
    socketRef.current.emit('nextNumber', {
      val, questionTypes
    })
  }

  const questionTypesAvailable = [
    QuestionType.ADD_TEN,
    QuestionType.ADD_TWENTY,
    QuestionType.CUBE,
    QuestionType.DOUBLE,
    QuestionType.PREDECESSOR,
    QuestionType.SQUARED,
    QuestionType.SUCCESSOR,
    QuestionType.TRIPLE
  ].sort((a, b) => a-b);

  const questionTypesActive = useRef(
    questionTypesAvailable.reduce((acc, key) => {
      acc[key] = false;
      return acc;
    }, {})
  );

  const setQuestionType = (active, index) => {
    questionTypesActive.current[index] = active;
  }

  return <div>
    <div>
      {number}
      <button onClick={() => {
        console.log(questionTypesActive.current);
        generateNumberAndEmitData();
      }} > VERIFY IT </button>
    </div>
    <ToggleTable
      questionTypesAvailable={questionTypesAvailable}
      setQuestionType={setQuestionType}
    />
  </div>
}

export default AdminData;