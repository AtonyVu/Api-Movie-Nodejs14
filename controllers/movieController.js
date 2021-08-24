const { validationResult } = require("express-validator");
const ObjectId = require("mongoose").Types.ObjectId;
const User = require("../models/UserModel");
const Movie = require("../models/movieModel");

// CREATE MOVIE
const createMovie = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const {
    title,
    description,
    creator,
    biDanh,
    trailer,
    maNhom,
    ngayKhoiChieu,
    danhGia,
  } = req.body;

  let existingUser = await User.findOne({ _id: creator });

  if (!existingUser)
    return res.status(400).json({ error: "Người Tạo Không hợp lệ " });

  const movie = req.body;
  try {
    const userCreate = await Movie.create({
      ...req.body,
    });
    res.status(200).json({
      message: "Thêm phim thành công",
      movie: movie,
    });
  } catch (error) {
    res.status(500).json(error.message);
    console.log(err);
  }
};

// GET MOVIE BY ID
const getMovieById = async (req, res) => {
  const movieId = req.params.id;
  if (!ObjectId.isValid(movieId))
    return res.status(400).json({ error: "ID không hợp lệ" });

  try {
    const movie = await Movie.findById(movieId);
    if (!movie) return res.status(404).json("Không tìm thấy phim nào");
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// GET ALL MOVIES
const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    return res.status(200).json(movies);
  } catch (err) {
    return res.status(500).json({ message: "server lỗi rồi" });
  }
};
// UPDATE MOVIE
const updateMovie = async (req, res) => {
  const urlImage = `${req.originalUrl}`;
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const {
    title,
    description,
    creator,
    biDanh,
    trailer,
    maNhom,
    ngayKhoiChieu,
    danhGia,
  } = req.body;
  const movieId = req.params.id;
  if (!ObjectId.isValid(movieId))
    return res.status(400).json({ error: "Invalid id" });

  try {
    const movie = await Movie.findById(movieId);
    if (!movie) return res.status(404).json({ message: "Không tìm thấy phim" });
    await movie.updateOne(
      {
        title,
        description,
        creator,
        biDanh,
        trailer,
        // hinhAnh: urlImage,
        maNhom,
        ngayKhoiChieu,
        danhGia,
      },
      {
        timestamps: { createdAt: false, updatedAt: true },
      }
    );
    return res.status(200).json(movie);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "server error" });
  }
};
// DELETE MOVIE
const deleteMovie = async (req, res) => {
  const movieId = req.params.id;
  if (!ObjectId.isValid(movieId))
    return res.status(400).json({ error: "Invalid id" });

  try {
    const moviedelete = await Movie.findOneAndDelete(movieId);
    res.status(200).json({ status: "success" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "lỗi rồi" });
  }
};
// PANIGATION MOVIE
const paginationMovie = async (req, res) => {
  let page = req.params.page || 1;
  let perPage = 20;
  try {
    const movies = await Movie.find()
      .skip(perPage * page - perPage)
      .limit(perPage);
    return res.status(200).json(movies);
  } catch (err) {
    return res.status(500).json({ message: "server error" });
  }
};

module.exports = {
  createMovie,
  getMovieById,
  getAllMovies,
  updateMovie,
  deleteMovie,
  paginationMovie,
};
