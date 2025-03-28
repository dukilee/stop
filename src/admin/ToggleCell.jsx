import { useState } from "react";
import './ToggleCell.css';

function ToggleCell({isActive=false, index, displayText, setQuestionType}){
    const [active, setActive] = useState(isActive);
    const handleClick = () => {
        setQuestionType(!active, index);
        setActive(prev => !prev);
    }
    return <div>
        <button onClick={handleClick} className={active?'toggle-cell-active':'toggle-cell-inactive'}>{displayText}</button>
    </div>
}

export default ToggleCell;