const { check } = require("express-validator");

const checksignIn = [
  check("taiKhoan", "Không đươc bỏ trống").not().isEmpty(),
  check("email", "Không Đúng Định dạng Email").normalizeEmail().isEmail(),
  check("password", "mật khẩu phải có ít nhất 10 từ").isLength({ min: 10 }),
  check("phone", "Không đúng định dạng SDT").isMobilePhone(),
  check("hoTen", "không được bỏ trống").not().isEmpty(),
];
const checkLogin = [
  check("email", "Không Đúng Định dạng Email").normalizeEmail().isEmail(),
  check("password", "mật khẩu phải có ít nhất 10 từ").isLength({ min: 10 }),
];
module.exports = { checksignIn, checkLogin };
