const movieController = require("../controllers/movieController");
const express = require("express");
const auth = require("../Authentication/auth");
const test = require("../middleware/Role");
const { checkData } = require("../Validation/movieValidator");
const router = express.Router();

const {
  createMovie,
  getMovieById,
  getAllMovies,
  updateMovie,
  deleteMovie,
  paginationMovie,
} = movieController;

router.post("/", auth, test, checkData, createMovie);

// GET MOVIE BY ID
router.get("/:id", getMovieById);

// GET ALL MOVIES
router.get("/", getAllMovies);

// UPDATE MOVIE
router.patch("/:id", auth, test, checkData, updateMovie);

router.delete("/:id", auth, test, deleteMovie);

router.get("/page/:page", paginationMovie);

module.exports = router;
