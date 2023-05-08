import { Request, Response } from "express";
import quizService from "../services/quizService";
import { QuoteQuiz } from "../types";

const getQuiz = async (req: Request, res: Response): Promise<Response> => {
  res.type("application/json");

  let quiz: QuoteQuiz[] = [];
  let amountQuotes: number = parseInt(req.params.randomamount);

  if (!isNaN(amountQuotes)) {
    quiz = await quizService.getQuiz(amountQuotes);
  } else {
    quiz = await quizService.getQuiz();
  }

  return res.status(200).json(quiz);
}

export default {
  getQuiz
}