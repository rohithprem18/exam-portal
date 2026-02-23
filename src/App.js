import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const inputRef = useRef(null);
  const timerRef = useRef(null);
  const timeLeftRef = useRef(120); 

  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    if (submitted) return;

    timerRef.current = setInterval(() => {
      timeLeftRef.current -= 1;
      setTimeLeft(timeLeftRef.current);

      if (timeLeftRef.current <= 0) {
        clearInterval(timerRef.current);
        setSubmitted(true);
        alert("Time is up! Exam auto-submitted.");
      }
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [submitted]);

  const handleSubmit = () => {
    if (submitted) return;

    clearInterval(timerRef.current);
    setSubmitted(true);
    alert("Exam submitted manually!");
  };

  const formatTime = (seconds) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Online Examination</h2>

        <p>Time Left: {formatTime(timeLeft)}</p>

        <textarea
          ref={inputRef}
          rows="6"
          cols="50"
          placeholder="Type your answer here..."
          disabled={submitted}
        />

        <br /><br />

        <button onClick={handleSubmit} disabled={submitted}>
          {submitted ? "Submitted" : "Submit"}
        </button>
      </header>
    </div>
  );
}

export default App;