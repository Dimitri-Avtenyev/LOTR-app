import quizService from "../services/quizService";

const getQuiz = async (req:any, res:any) => {
  res.type("application/json");

  let amountQuotes:number = req.params.randomamount;
  const quiz = await quizService.getQuiz(amountQuotes);

  res.status(200).json(quiz);
}

export default {
  getQuiz
}