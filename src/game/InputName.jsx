import { useState } from "react";
import './InputName.css';

function InputName({ setUsername }) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page reload
    setUsername(name);
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button className="form-button" type="submit">Submit</button>
    </form>
  );
}

export default InputName;