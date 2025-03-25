import { useState } from 'react';
import './Question.css';

function Question({questionId, onAnswer, questionData}){
    console.log(questionData);
    const [selected, updateSelection] = useState(-1);
    const alternativeSelected = (option) => {
        onAnswer(questionId, option);
        updateSelection(option);
    }

    return <div className='container'>
        <div className="question">
            {questionData?.text || 'Simple question'}
        </div>
        <div style={{ padding: '1rem' }}>
            {[...Array(4)].map((_, index) => (
                <button key={index}
                onClick={() => alternativeSelected(index)}
                className={"button "+(selected == index ? "selected-button" : "unselected-button")}
                >
                    {questionData?.alternatives[index] || 1}
                </button>
            ))}
        </div>
    </div>

}

export default Question;