const { check } = require("express-validator");

const checkBooking = [
  check("maRap", "thiếu mã rạp rồi bạn ehhh").not().isEmpty(),
  check("giaVe", "thiếu giá vé rồi bạn ehhh").not().isEmpty(),
  check("maPhim", "thiếu mã phim rồi").not().isEmpty(),
  check("creator", "thiếu người tạo rồi").not().isEmpty(),
];
module.exports = { checkBooking };
