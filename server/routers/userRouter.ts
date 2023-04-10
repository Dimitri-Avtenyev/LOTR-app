import express  from "express";
import userController from "../controllers/userController";

const router = express.Router();

// GET
router.get("/", userController.getUsersHighscore);
router.get("/all", userController.getAllUsers);

// POST
router.post("/signup", userController.addUser);
router.post("/login", userController.loginUser);
router.post("/addusertohighscores", userController.addUserToHighscores)

// PUT
router.put("/updatefavorites", userController.updateUserFavorites); 

// DELETE
router.delete("/highscores/emptyall", userController.emptyHighscoresCollection);
router.delete("/all/empty", userController.emptyUsersCollection);


export default {
  router
}

