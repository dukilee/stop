import { useEffect, useState } from "react";

function Database(){
 const [answers, setAnswers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/answers")
      .then((res) => res.json())
      .then((data) => setAnswers(data));
  }, []);

  return (
    <div>
      <h1>Test Data from MongoDB</h1>
      {answers.map((a, i) => (
        <div key={i}>
          <p><strong>{a.name}</strong> from <em>{a.university}</em></p>
          <p>Timestamp: {a.timestamp}</p>
          <p>Payload: {a.payload}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default Database;