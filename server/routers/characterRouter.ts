import express  from "express";
import characterController from "../controllers/characterController";

const router = express.Router();

// GET
router.get("/", characterController.getCharacters);

// POST

// PUT

// DELETE


export default {
  router
}