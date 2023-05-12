import express  from "express";
import userController from "../controllers/userController";

const router = express.Router();

// GET
router.get("/", userController.getAllUsers);
router.get("/user/:typelist", userController.getUserList);
router.get("/highscore", userController.getUserHighscore);

// POST

// PUT
router.put("/update", userController.updateUser); 

// DELETE
router.delete("/user/:typelist/:id", userController.deleteListItem);
router.delete("/empty", userController.emptyUsersCollection);


export default {
  router
}

