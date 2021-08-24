const { check } = require("express-validator");

const checksignIn = [
  check("taiKhoan").not().isEmpty(),
  check("email").normalizeEmail().isEmail(),
  check("password", "mật khẩu phải có ít nhất 10 từ").isLength({ min: 10 }),
  check("phone").isMobilePhone(),
  check("hoTen").not().isEmpty(),
];
const checkLogin = [
  check("email").normalizeEmail().isEmail(),
  check("password").isLength({ min: 10 }),
];
module.exports = { checksignIn, checkLogin };
