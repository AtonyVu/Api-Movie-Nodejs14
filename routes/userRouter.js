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
  register,
  login,
} = usersController;
router.post("/signIn", checksignIn, register);
router.post("/login", checkLogin, login);

router
  .route("/:id")
  .delete(auth, test, deleteUser)
  .get(auth, test, getUserByID)
  .patch(auth, test, updateUser);

router.post("/", auth, test, checkDataUser, createUser);

router.route("/listUser/all").get(auth, test, getListUser);
router.get("/listUser/:type", auth, test, getUserType);

router.get("/listUser/page/:page", auth, test, paginationUser);

router.get("/listUser/search/:tuKhoa", auth, test, searchUser);

module.exports = router;
