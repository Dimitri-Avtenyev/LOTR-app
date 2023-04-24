import express  from "express";
import characterController from "../controllers/characterController";

const router = express.Router();

// GET
router.get("/", characterController.getCharacters);
router.get("/:id", characterController.getCharacter);
router.get("/:id/quote", characterController.getCharacterQuotes);
// POST

// PUT

// DELETE


export default {
  router
}