const { check } = require("express-validator");

const checkData = [
  check("title", "Không được bỏ trống").not().isEmpty(),
  check("description", "Không được bỏ trống").not().isEmpty(),
  check("creator", "Không được bỏ trống").not().isEmpty(),
  check("biDanh", "Không được bỏ trống").not().isEmpty(),
  check("trailer", "Không được bỏ trống").not().isEmpty(),
  check("maNhom", "Không được bỏ trống").not().isEmpty(),
  check("ngayKhoiChieu", "Không được bỏ trống").not().isEmpty().isDate(),
];

module.exports = { checkData };
