import express  from "express";
import userController from "../controllers/userController";

const router = express.Router();

// GET
router.get("/", userController.getAllUsers);
router.get("/user/favorites", userController.getUserFavorites);
router.get("/highscores", userController.getUsersHighscore);

// POST
router.post("/addusertohighscores", userController.addUserToHighscores)

// PUT
router.put("/update", userController.updateUser); 

// DELETE
router.delete("/highscores/empty", userController.emptyHighscoresCollection);
router.delete("/empty", userController.emptyUsersCollection);


export default {
  router
}

