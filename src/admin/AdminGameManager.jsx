import { io } from 'socket.io-client';
import { useRef, useState, useEffect } from 'react';
import Sidebar from './SideBar';
import ToggleTable from './ToggleTable';
import { QuestionType } from '../InputQuestionType';

function AdminData(){
  const questionTypesAvailable = [
    QuestionType.ADD_TEN,
    QuestionType.ADD_TWENTY,
    QuestionType.CUBE,
    QuestionType.DOUBLE,
    QuestionType.PREDECESSOR,
    QuestionType.SQUARED,
    QuestionType.SUCCESSOR,
    QuestionType.TRIPLE
  ];

  const questionTypesActive = useRef(
    questionTypesAvailable.reduce((acc, key) => {
      acc[key] = false;
      return acc;
    }, {})
  );

  console.log(questionTypesActive.current);
  const setQuestionType = (active, index) => {
    questionTypesActive.current[index] = active;
  }

  return <div>
    <button onClick={() => {
      console.log(questionTypesActive.current);
    }} > VERIFY IT </button>
    <ToggleTable
      questionTypesAvailable={questionTypesAvailable}
      setQuestionType={setQuestionType}
    />
  </div>
}

export default AdminData;