import express  from "express";
import quoteController from "../controllers/quoteController";

const router = express.Router();

// GET
router.get("/", quoteController.getQuotes);

// POST

// PUT

// DELETE


export default {
  router
}