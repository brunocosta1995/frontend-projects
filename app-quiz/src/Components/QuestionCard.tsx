import React from "react";
import { AnswerObject } from "../App";

type Props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNumber: number;
  totalQuestions: number;
};

function QuestionCard({
  question,
  answers,
  callback,
  userAnswer,
  questionNumber,
  totalQuestions,
}: Props) {
  return (
    <div>
      <p className="number">
        Question: {questionNumber} / {totalQuestions}
      </p>
      <p dangerouslySetInnerHTML={{ __html: question }}></p>
      <div>
        {answers.map((answer) => {
          return (
            <div key={answer}>
              <button disabled={Boolean(userAnswer)} value={answer} onClick={callback}>
                <span dangerouslySetInnerHTML={{ __html: answer }}></span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default QuestionCard;
