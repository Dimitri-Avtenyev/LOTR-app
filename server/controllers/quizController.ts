import quizService from "../services/quizService";

const getQuiz = async (req:any, res:any) => {
  let amountQuotes:number = req.params.randomamount;
  
  res.type("application/json");
  const quiz = await quizService.getQuiz(amountQuotes);
  res.status(200).json(quiz);
}

export default {
  getQuiz
}