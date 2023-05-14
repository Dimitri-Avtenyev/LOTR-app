import { Request, Response } from "express";
import quizService from "../services/quizService";
import { QuoteQuiz, User } from "../types";
import userService from "../services/userService";

const getQuiz = async (req: Request, res: Response): Promise<Response> => {
  res.type("application/json");

  let quiz: QuoteQuiz[] = [];
  let amountQuotes: number = parseInt(req.params.randomamount);
    
  let user : User | null = await userService.getUser(req.body.payload.username);

  if (!isNaN(amountQuotes) && user !== null) {
    quiz = await quizService.getQuiz(user.blacklist, amountQuotes);
  } else {
    quiz = await quizService.getQuiz(user?.blacklist);
  }

  return res.status(200).json(quiz);
}

export default {
  getQuiz
}