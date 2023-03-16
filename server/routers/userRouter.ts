import express  from "express";
import userController from "../controllers/userController";

const router = express.Router();

// GET
router.get("/", userController.getUsersHighscore);

// POST
router.post("/adduser", userController.addUser);
router.post("/addusertohighscores", userController.addUserToHighscores)
// PUT

// DELETE
router.delete("/highscores/emptyall", userController.emptyHighscoresCollection);

export default {
  router
}

