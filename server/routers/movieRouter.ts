import express  from "express";
import movieController from "../controllers/movieController";

const router = express.Router();

// GET
router.get("/", movieController.getMovies);

// POST

// PUT

// DELETE


export default {
  router
}