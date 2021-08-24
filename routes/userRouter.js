const { check } = require("express-validator");
const usersController = require("../controllers/userController");
const express = require("express");
const auth = require("../Authentication/auth");
const test = require("../middleware/Role");
const router = express.Router();
const { checkDataUser } = require("../Validation/userValidator");
// Route Đăng kí
router.post(
  "/register",
  [
    check("taiKhoan").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 10 }),
    check("phone").isMobilePhone(),
    check("hoTen").not().isEmpty(),
  ],
  usersController.register
);
// Route Đăng nhập
router.post(
  "/login",
  [
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 10 }),
  ],
  usersController.login
);
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
} = usersController;
// Route Xóa user
router.delete("/:userID", auth, test, deleteUser);
// Tìm thông tin user
router.get("/:userID", auth, test, getUserByID);
// Update user
router.put("/:userID", auth, test, updateUser);
// Tạo thêm user
router.post("/", auth, test, checkDataUser, createUser);
module.exports = router;
// Route List account
router.get("/list-user", auth, test, getListUser);
// Route List type
router.get("/list-user/:type", auth, test, getUserType);
// Route Panigation
router.get("/list-user/page/:page", auth, test, paginationUser);
// Route Tìm kiếm user
router.get("/list-user/search/:tuKhoa", auth, test, searchUser);
// Route Tìm kiếm page user
router.get("/list-user/search/:tuKhoa/:page", auth, test, searchPagaUser);
