import quizService from "../services/quizService";

const getQuiz = async (req:any, res:any) => {
  res.type("application/json");
  const quiz = await quizService.getQuiz();
  res.status(200).json(quiz);
}

export default {
  getQuiz
}