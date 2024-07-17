import React, {useState} from "react";
import {fetchQuizQuestions} from "./API";
//Components
import QuestionCard from "./Components/QuestionCard";
//types
import { Difficulty } from "./API";

const TOTAL_QUESTIONS = 10;

function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);


  async function startTrivia() {}

  function checkAnswer(e: React.MouseEvent<HTMLButtonElement>) {}

  function nextQuestion() {}

  

  console.log(fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.MEDIUM));

  return (
    <div className="App">
      <h1>React Quiz App</h1>
      <button className="start" onClick={startTrivia}>
        Start Trivia
      </button>
      <p className="score">Score: </p>
      <p>Loading Next Question...</p>
      {/* <QuestionCard
        questionNumber={number + 1}
        totalQuestions={TOTAL_QUESTIONS}
        question={questions[number].question}
        answers={questions[number].answers}
        callback={checkAnswer}
        userAnswer={userAnswers ? userAnswers[number] : undefined}
      /> */}
      <button className="next" onClick={nextQuestion}>
        Next Question
      </button>
    </div>
  );
}

export default App;
