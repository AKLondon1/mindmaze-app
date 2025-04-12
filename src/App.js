import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const FadeIn = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.div>
);


const SECTIONS = [
  {
    name: "Fluid Reasoning",
    questions: [
      { question: "What comes next? 3, 6, 12, 24, ?", options: ["36", "48", "50", "60"], correct: 1 },
      { question: "If all Bloops are Razzies, and all Razzies are Lazzies, are all Bloops definitely Lazzies?", options: ["Yes", "No", "Cannot be determined", "Only some"], correct: 0 },
      { question: "Find the odd one out: 2, 4, 8, 16, 34", options: ["2", "8", "16", "34"], correct: 3 },
      { question: "Which pattern logically follows? ▲, ▼, ▲, ▼, ?", options: ["▼", "▲", "◼", "○"], correct: 1 },
      { question: "Which number completes the series: 1, 4, 9, 16, ?", options: ["25", "30", "36", "20"], correct: 0 },
      { question: "Which number is missing? 7, 14, ?, 56", options: ["21", "24", "28", "32"], correct: 2 },
      { question: "Which one doesn't belong? Dog, Cat, Car, Bird", options: ["Dog", "Cat", "Car", "Bird"], correct: 2 },
      { question: "What is the next number? 5, 10, 20, 40, ?", options: ["45", "50", "60", "80"], correct: 3 },
      { question: "What is the pattern? A1, B2, C3, D4, ?", options: ["E5", "F4", "E4", "D5"], correct: 0 },
      { question: "Complete the series: 1, 1, 2, 3, 5, 8, ?", options: ["11", "13", "10", "14"], correct: 1 }
    ]
  },
  {
    name: "Verbal Reasoning",
    questions: [
      { question: "Synonym of 'elated'?", options: ["Sad", "Joyful", "Angry", "Confused"], correct: 1 },
      { question: "Opposite of 'transparent'?", options: ["Obvious", "Opaque", "Visible", "Pure"], correct: 1 },
      { question: "Which is a verb?", options: ["Swim", "Blue", "Fast", "Smart"], correct: 0 },
      { question: "Analogy: Book is to Read as Knife is to?", options: ["Cut", "Eat", "Sharpen", "Metal"], correct: 0 },
      { question: "What is a synonym for 'diminish'?", options: ["Grow", "Expand", "Reduce", "Increase"], correct: 2 },
      { question: "Which one is a noun?", options: ["Run", "Jump", "Idea", "Quickly"], correct: 2 },
      { question: "Choose the correctly spelled word:", options: ["Recieve", "Receive", "Recive", "Receeve"], correct: 1 },
      { question: "Which word fits? A group of wolves is called a ____.", options: ["Flock", "Pack", "Swarm", "Herd"], correct: 1 },
      { question: "Choose the correct homonym: I will ____ the gift.", options: ["Except", "Accept"], correct: 1 },
      { question: "Analogy: Pen is to Writer as Brush is to?", options: ["Painter", "Artist", "Wall", "Ink"], correct: 0 }
    ]
  },
  {
    name: "Memory",
    questions: [
      { sequence: ["Dog", "Chair", "Apple"], prompt: "What was the second item?", options: ["Dog", "Chair", "Apple", "Table"], correct: 1 },
      { sequence: ["Green", "Red", "Blue", "Yellow"], prompt: "What was the last color?", options: ["Blue", "Red", "Yellow", "Green"], correct: 2 },
      { sequence: ["1", "4", "2", "3"], prompt: "What was the second number?", options: ["1", "4", "2", "3"], correct: 1 },
      { sequence: ["Cup", "Pen", "Phone"], prompt: "What was the first item?", options: ["Cup", "Pen", "Phone", "Paper"], correct: 0 },
      { sequence: ["Tree", "Cloud", "Star"], prompt: "What was the third item?", options: ["Sun", "Star", "Tree", "Cloud"], correct: 1 },
      { sequence: ["Bike", "Car", "Train", "Plane"], prompt: "What was the second item?", options: ["Car", "Bike", "Plane", "Train"], correct: 0 },
      { sequence: ["Apple", "Banana", "Grape"], prompt: "What was the first fruit?", options: ["Banana", "Grape", "Apple", "Orange"], correct: 2 },
      { sequence: ["Key", "Wallet", "Phone"], prompt: "What was the second item?", options: ["Phone", "Key", "Wallet", "Bag"], correct: 2 },
      { sequence: ["Chair", "Table", "Lamp", "Sofa"], prompt: "What was the third item?", options: ["Lamp", "Table", "Chair", "Sofa"], correct: 0 },
      { sequence: ["Red", "Blue", "Green", "Yellow"], prompt: "What was the second color?", options: ["Red", "Green", "Blue", "Yellow"], correct: 2 }
    ]
  },
  {
    name: "Spatial Reasoning",
    questions: [
      { question: "Which shape is a mirror of this one?", options: ["A", "B", "C", "D"], correct: 0 },
      { question: "Which fits best in the pattern?", options: ["X", "Y", "Z", "W"], correct: 2 },
      { question: "Which cube can be formed from this net?", options: ["1", "2", "3", "4"], correct: 1 },
      { question: "What does a triangle look like when flipped horizontally?", options: ["Same", "Flipped", "Rotated", "Upside Down"], correct: 1 },
      { question: "Which image is different from the others?", options: ["1", "2", "3", "4"], correct: 3 },
      { question: "Which shape completes the rotation?", options: ["◼", "◯", "▲", "◆"], correct: 2 },
      { question: "Choose the correct net for a cube.", options: ["A", "B", "C", "D"], correct: 1 },
      { question: "Which shape does not belong?", options: ["Circle", "Square", "Cube", "Hexagon"], correct: 2 },
      { question: "Identify the rotated version.", options: ["X", "Y", "Z", "W"], correct: 0 },
      { question: "What is the mirror image of ▲?", options: ["▼", "◀", "▶", "▲"], correct: 0 }
    ]
  },
  {
    name: "Quantitative Reasoning",
    questions: [
      { question: "What is 20% of 50?", options: ["5", "10", "15", "20"], correct: 1 },
      { question: "If x + 5 = 12, x = ?", options: ["5", "6", "7", "8"], correct: 2 },
      { question: "Solve: 9 x 3 =", options: ["27", "18", "21", "24"], correct: 0 },
      { question: "What is the square root of 81?", options: ["7", "8", "9", "10"], correct: 2 },
      { question: "If a = 4 and b = 2, what is a² + b²?", options: ["16", "20", "18", "10"], correct: 1 },
      { question: "What is 100 divided by 4?", options: ["20", "25", "30", "35"], correct: 1 },
      { question: "What is 3/5 as a percentage?", options: ["60%", "30%", "75%", "80%"], correct: 0 },
      { question: "What is 15²?", options: ["225", "250", "200", "215"], correct: 0 },
      { question: "If you buy 3 items at £5 each, what’s the total?", options: ["£10", "£15", "£20", "£25"], correct: 1 },
      { question: "What is 1/4 of 64?", options: ["12", "14", "16", "18"], correct: 2 }
    ]
  }
];



function App() {
  const [screen, setScreen] = useState("welcome");
  const [sectionIndex, setSectionIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [scores, setScores] = useState(Array(SECTIONS.length).fill(0));
  const [mode, setMode] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // ✅ Define this before using it
  const TOTAL_TIME = mode === "quick" ? 10 * 60 : 90 * 60;

  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [showSequence, setShowSequence] = useState(true);
  useEffect(() => {
    if (screen === "test") {
      setTimeLeft(TOTAL_TIME);
    }
  }, [mode, screen]);  

  const activeSections = SECTIONS.map(sec =>
    mode === "quick" ? { ...sec, questions: sec.questions.slice(0, 2) } : sec
  );
  const section = activeSections[sectionIndex];
  
  const question = section.questions[questionIndex];

  useEffect(() => {
    if (screen === "test" && timeLeft > 0 && !isPaused) {
      const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && screen === "test") {
      setScreen("results");
    }
  }, [screen, timeLeft, isPaused]);
  

  const handleAnswer = (index) => {
    const isCorrect = index === question.correct;
    const newScores = [...scores];
    if (isCorrect) {
      newScores[sectionIndex]++;
    }
    setScores(newScores);

    if (questionIndex + 1 < section.questions.length) {
      setQuestionIndex(q => q + 1);
      setShowSequence(true);
    } else if (sectionIndex + 1 < SECTIONS.length) {
      setSectionIndex(s => s + 1);
      setQuestionIndex(0);
      setShowSequence(true);
    } else {
      setScreen("results");
    }
  };

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  if (screen === "welcome") {
    return (
      <FadeIn>
        <div className={`App ${darkMode ? "dark" : ""}`}>
          <h1>🧠 Welcome to MindMaze</h1>
          <p>Choose how you'd like to begin your mental workout:</p>

<button onClick={() => setDarkMode(d => !d)}>
  {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
</button>
          <button onClick={() => {
            setMode("quick");
            setScreen("test");
          }}>
            🚀 Quick Challenge (10 mins)
          </button>
          <button onClick={() => {
            setMode("full");
            setScreen("test");
          }}>
            🧠 Full MindMaze Test (90 mins)
          </button>
        </div>
      </FadeIn>
    );
  }
  
  
  

  if (screen === "test") {
    return (
      <FadeIn>
        <div className={`App ${darkMode ? "dark" : ""}`}>
        <h2>{section.name}</h2>
<p>
  Section {sectionIndex + 1} of {activeSections.length} — 
  Question {questionIndex + 1} of {section.questions.length}
</p>
<p>⏱ Time Left: {formatTime(timeLeft)}</p>

<p style={{ fontSize: "0.85rem", marginBottom: "4px" }}>Question Progress</p>
<div className="question-progress-container">
  <div
    className="question-progress-bar"
    style={{
      width: `${(
        (
          activeSections
            .slice(0, sectionIndex)
            .reduce((sum, sec) => sum + sec.questions.length, 0) +
          questionIndex + 1
        ) /
        activeSections.reduce((sum, sec) => sum + sec.questions.length, 0)
      ) * 100}%`
    }}
  />
</div>

<p style={{ fontSize: "0.85rem", margin: "12px 0 4px" }}>Time Remaining</p>
<div className="timer-bar-container">
  <div
    className="timer-bar"
    style={{ width: `${(timeLeft / TOTAL_TIME) * 100}%` }}
  />
</div>



<button onClick={() => setIsPaused(p => !p)}>
  {isPaused ? "Resume Test" : "Pause Test"}
</button>



  
          {section.name === "Memory" && showSequence ? (
            <>
              <p><strong>{question.sequence.join(" - ")}</strong></p>
              <button onClick={() => setShowSequence(false)}>Next</button>
            </>
          ) : (
            <>
              <p>{question.question || question.prompt}</p>
              {question.options.map((opt, i) => (
                <button key={i} onClick={() => handleAnswer(i)}>
                  {opt}
                </button>
              ))}
            </>
          )}
        </div>
      </FadeIn>
    );
  }
  

  if (screen === "results") {
    const total = SECTIONS.reduce((sum, sec) => sum + sec.questions.length, 0);
    const score = scores.reduce((a, b) => a + b, 0);
    const estimatedIQ = Math.round(90 + (score / total) * 50);
  
    const getRating = (percent) => {
      if (percent >= 0.9) return "🟢 Strong";
      if (percent >= 0.6) return "🟡 Average";
      return "🔴 Needs Work";
    };
  
    return (
      <FadeIn>
        <div className={`App ${darkMode ? "dark" : ""}`}>
          <h1>🎉 Test Complete!</h1>
          <p>Your estimated IQ: <strong>{estimatedIQ}</strong></p>
          <h3>Section Breakdown:</h3>
          <ul style={{ textAlign: "left", paddingLeft: 0, listStyle: "none" }}>
            {SECTIONS.map((sec, i) => {
              const correct = scores[i];
              const totalQs = sec.questions.length;
              const percent = correct / totalQs;
              return (
                <li key={i} style={{ marginBottom: "10px" }}>
                  <strong>{sec.name}</strong>: {correct}/{totalQs} — {getRating(percent)}
                </li>
              );
            })}
          </ul>
          <button onClick={() => window.location.reload()}>Restart</button>
        </div>
      </FadeIn>
    );
  }  

  return null;
}

export default App;
