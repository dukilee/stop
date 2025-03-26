import React, { useState } from 'react';
import './InputQuestion.css';
import { QuestionType, verify, name} from './InputQuestionType';

function InputQuestion({ questionId, questionType , updateAnswer, selectedNumber}) {
  const [answer, setAnswer] = useState('');

  const handleChange = (e) => {
    setAnswer(e.target.value);
    updateAnswer(questionId, e.target.value);
  };

  return (
    <div className="question-box">
      <p className="question-text">{name(questionType)}</p>
      <input
        type="number"
        value={answer}
        onChange={handleChange}
        className="answer-input"
        placeholder="Type your answer"
      />
    </div>
  );
}

export default InputQuestion;