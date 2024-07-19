import {Wrapper, ButtonWrapper} from "./QuestionCard.styles";
import React from "react";
import { AnswerObject } from "../App";
//styles

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
    
    <Wrapper>
      <p className="number">
        Question: {questionNumber} / {totalQuestions}
      </p>
      <p dangerouslySetInnerHTML={{ __html: question }}></p>
      <div>
        {answers.map((answer) => {
          return (
            <ButtonWrapper
              key={answer}
              correct={userAnswer?.correctAnswer === answer}
             userClicked={userAnswer?.answer === answer}
            >
              <button
                disabled={Boolean(userAnswer)}
                value={answer}
                onClick={callback}
              >
                <span dangerouslySetInnerHTML={{ __html: answer }}></span>
              </button>
            </ButtonWrapper>
          );
        })}
      </div>
    </Wrapper>
    
  );
}

export default QuestionCard;
