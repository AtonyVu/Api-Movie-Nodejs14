const { check } = require("express-validator");
const usersController = require("../controllers/userController");
const express = require("express");
const auth = require("../Authentication/auth");
const test = require("../middleware/Role");
const router = express.Router();
const { checkDataUser } = require("../Validation/userValidator");
const { checkLogin, checksignIn } = require("../Validation/authValidator");
const {
  deleteUser,
  getUserByID,
  updateUser,
  createUser,
  getListUser,
  getUserType,
  paginationUser,
  searchUser,
  searchPagaUser,
  register,
  login,
} = usersController;
router.post("/signIn", checksignIn, register);
router.post("/login", checkLogin, login);

router.delete("/:id", auth, test, deleteUser);

router.get("/:id", auth, test, getUserByID);
router.put("/:id", auth, test, updateUser);

router.post("/", auth, test, checkDataUser, createUser);
module.exports = router;

router.get("/listUser", auth, test, getListUser);

router.get("/listUser/:type", auth, test, getUserType);

router.get("/listUser/page/:page", auth, test, paginationUser);

router.get("/listUser/search/:tuKhoa", auth, test, searchUser);

router.get("/listUser/search/:tuKhoa/:page", auth, test, searchPagaUser);
