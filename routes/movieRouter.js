const movieController = require("../controllers/movieController");
const express = require("express");
const auth = require("../Authentication/auth");
const test = require("../middleware/Role");
const uploadImage = require("../middleware/uploadImage");
const movieValidation = require("../Validation/movieValidator");
const router = express.Router();

const {
  createMovie,
  getMovieById,
  getAllMovies,
  updateMovie,
  deleteMovie,
  paginationMovie,
  dateMovie,
} = movieController;

// CREATE MOVIE
router.post(
  "/",
  auth,
  test,
  uploadImage("hinhAnh"),
  movieValidation.checkData,
  createMovie
);

// GET MOVIE BY ID
router.get("/:id", getMovieById);

// GET ALL MOVIES
router.get("/", getAllMovies);

// UPDATE MOVIE
router.put("/:id", auth, test, movieValidation.checkData, updateMovie);
// Cũng có thể sử dụng PATCH

// DELETE MOVIE
router.delete("/:id", auth, test, deleteMovie);

// PAGINATION
router.get("/page/:page", paginationMovie);

// DATE MOVIE
router.get("/date/movie", dateMovie);
module.exports = router;
