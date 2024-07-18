import React, { useState } from "react";
import { fetchQuizQuestions } from "./API";
//Components
import QuestionCard from "./Components/QuestionCard";
//types
import { Question, Difficulty } from "./API";

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 10;

function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  async function startTrivia() {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );
    setQuestions(newQuestions);
    setNumber(0);
    setScore(0);
    setUserAnswers([]);
    setLoading(false);
  }
  console.log(number);

  function checkAnswer(e: React.MouseEvent<HTMLButtonElement>) {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const checkAnswer = questions[number].correct_answer === answer;
      if (checkAnswer) {
        setScore((prevValue) => prevValue + 1);
      }
      const actualAnswer: AnswerObject = {
        question: questions[number].question,
        answer: answer,
        correct: checkAnswer,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prevValue) => [...prevValue, actualAnswer]);
    }
  }

  function nextQuestion() {
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  }

  return (
    <div className="App">
      <h1>React Quiz App</h1>
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <button className="start" onClick={startTrivia}>
          Start Trivia
        </button>
      ) : null}

      {!gameOver ? <p className="score">Score: {score}</p> : null}
      {loading && <p>Loading Next Question...</p>}
      {questions && questions.length ? (
        <QuestionCard
          questionNumber={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question}
          answers={questions[number].answers}
          callback={checkAnswer}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
        />
      ) : null}
      {!gameOver &&
      !loading &&
      userAnswers.length === number + 1 &&
      number !== TOTAL_QUESTIONS - 1 ? (
        <button className="next" onClick={nextQuestion}>
          Next Question
        </button>
      ) : null}
    </div>
  );
}

export default App;
