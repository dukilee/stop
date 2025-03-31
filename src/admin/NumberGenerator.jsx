import { useState } from "react";

function NumberGenerator({emit}){
  const [number, setNumber] = useState(19);
  const [minimum, setMinimum] = useState(-10);
  const [maximum, setMaximum] = useState(20);

  const handleChange = (val, setVal) => {
    if(val==''){
      setVal(val);
    }else if(!isNaN(val)){
      setVal(parseInt(val));
    }
  }

  return <div>
    <div>
      {number}
    </div>
    <div>
      from: 
      <input
        type="number"
        value={minimum}
        onChange={(e) => {handleChange(e.target.value, setMinimum)}}
      />
        to: 
      <input
        type="number"
        value={maximum}
        onChange={(e) => {handleChange(e.target.value, setMaximum)}}
      />
      <button
        onClick = {() => {
          const val = Math.floor(Math.random()*(maximum - minimum + 1) + minimum);
          setNumber(val);
          emit(val);
      }}> GENERATE </button>
    </div>
  </div>



}

export default NumberGenerator;