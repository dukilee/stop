import React, { useEffect, useState } from 'react';
import './InputQuestion.css';
import { QuestionType, verify, name, isNumberOnly} from './InputQuestionType';

function InputQuestion({ questionId, questionType , updateAnswer, display=null}) {
  const [answer, setAnswer] = useState('');

  const handleChange = (e) => {
    setAnswer(e.target.value);
    updateAnswer(questionId, e.target.value);
  };

  useEffect(() => {
    if(display == null){
      setAnswer('');
    }
  }, [display]);

  return (
    <div className="question-box">
      <p className="question-text">{name(questionType)}</p>
      {(display!=null)?
        <p className={display?"answer-correct":"answer-wrong"}>{answer?answer:"_"}</p>
        :
        <input
          type={isNumberOnly(questionType)?"number":"text"}
          value={answer}
          onChange={handleChange}
          className="answer-input"
          placeholder="Type your answer"
        />
      }
    </div>
  );
}

export default InputQuestion;