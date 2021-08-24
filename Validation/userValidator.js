const { check } = require("express-validator");

const checkDataUser = [
  check("taiKhoan", "Không được để trống").not().isEmpty(),
  check("password", "Mật khẩu phải lớn hơn 10 ")
    .isLength({ min: 10 })
    .not()
    .isEmpty(),
  check("email", "không đúng định dạng email")
    .normalizeEmail()
    .isEmail()
    .not()
    .isEmpty(),
  check("phone", "Không đúng định dạng số điên thoại ")
    .isMobilePhone()
    .not()
    .isEmpty(),
  check("maNhom", "Không được để trống").not().isEmpty(),
  check("type", "Không được để trống").not().isEmpty(),
  check("hoTen", "Không được để trống").not().isEmpty(),
  check("creator", "Không được để trống").not().isEmpty(),
];

module.exports = { checkDataUser };
