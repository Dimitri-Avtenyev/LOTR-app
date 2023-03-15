import express  from "express";
import userController from "../controllers/userController";

const router = express.Router();

// GET
router.get("/", userController.getUsers);

// POST
router.post("/adduser", userController.addUser)
// PUT

// DELETE
export default {
  router
}

