import React, { useState } from 'react';
import ToggleCell from './ToggleCell';
import { name } from '../InputQuestionType';
import './ToggleTable.css';

function ToggleTable({questionTypesAvailable, setQuestionType}){

  const items = Array.from({ length: questionTypesAvailable.length }, (_, i) => (
    <ToggleCell
      isActive={false}
      index={questionTypesAvailable[i]}
      key={i}
      displayText={name(questionTypesAvailable[i])}
      setQuestionType={setQuestionType}
    />
  ));

  return (
    <div className="grid-container">
      {items}
    </div>
  );

};

export default ToggleTable;