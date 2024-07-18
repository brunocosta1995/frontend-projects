import { shuffleArray } from "./utils";


export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export type Question = {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  answers: string[];
};

export async function fetchQuizQuestions(
  amount: number,
  difficulty: Difficulty
): Promise<Question[]> {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`HTTP error! status ${response.status}`);
    }
    const promise = await response.json();
    const data: Question[] = promise.results;
    return data.map((question: Question) => ({
      ...question,
      answers: shuffleArray([
        ...question.incorrect_answers,
        question.correct_answer,
      ]),
    }));
  } catch (error) {
    const errMsg =
      error instanceof Error ? error.message : "There was an error...";
    console.log(errMsg);
    return [];
  }
}
