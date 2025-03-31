import { io } from 'socket.io-client';
import { useRef, useState, useEffect } from 'react';
import ToggleTable from './ToggleTable';
import { QuestionType } from '../InputQuestionType';
import { getBackendUrl } from '../Server';
import UsersPanel from './UsersPanel';
import NumberGenerator from './NumberGenerator';

function AdminData(){
  const socketRef = useRef(null);
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

  const setNumberAndEmitData = (val) => {
    console.log('val wa generated');
    const questionTypes = Object.entries(questionTypesActive.current).filter(([key, value]) => value).map(([key])=>parseInt(key));
    socketRef.current.emit('nextNumber', {
      val, questionTypes
    })
  }

  const questionTypesAvailable = [
    QuestionType.ADD_TEN,
    QuestionType.ADD_TWENTY,
    QuestionType.CUBE,
    QuestionType.DOUBLE,
    QuestionType.PARITY,
    QuestionType.PERFECT_CUBE,
    QuestionType.PERFECT_SQUARE,
    QuestionType.PREDECESSOR,
    QuestionType.PRIME,
    QuestionType.SQUARED,
    QuestionType.SUCCESSOR,
    QuestionType.TRIPLE,
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
    <NumberGenerator emit={setNumberAndEmitData}/>
    <ToggleTable
      questionTypesAvailable={questionTypesAvailable}
      setQuestionType={setQuestionType}
    />
    <UsersPanel />
  </div>
}

export default AdminData;