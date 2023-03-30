import express  from "express";
import quizController from "../controllers/quizController";

const router = express.Router();

// GET
router.get("/", quizController.getQuiz);
router.get("/:randomamount", quizController.getQuiz);

// POST

// PUT

// DELETE


export default {
  router
}