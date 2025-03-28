import { useState } from "react";
import './ToggleCell.css';

function ToggleCell({isActive=false, index}){
    const [active, setActive] = useState(isActive);
    const handleClick = () => {
        setActive(prev => !prev);
        console.log(index);
    }
    return <div>
        <button onClick={handleClick} className={active?'toggle-cell-active':'toggle-cell-inactive'}>MATH{index}</button>
    </div>
}

export default ToggleCell;