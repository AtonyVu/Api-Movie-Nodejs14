const LichChieu = require("../models/LC-model");
const Ticket = require("../models/ticket.model");
const User = require("../models/UserModel");
const Movie = require("../models/movieModel");
const { validationResult } = require("express-validator");
const ObjectId = require("mongoose").Types.ObjectId;
// Tạo lịch chiếu
const createLC = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { maRap, giaVe, maPhim, ngayGioKhoiChieu, idNguoitao } = req.body;

  if (!ObjectId.isValid(maPhim))
    return res.status(400).json({ error: "ID không hợp lệ" });

  let existingUser = await User.findOne({ _id: idNguoitao });
  let existingMovie = await Movie.findOne({ _id: maPhim });

  if (!existingMovie)
    return res.status(400).json({ error: "Phim không tồn tại" });
  if (!existingUser)
    return res.status(400).json({ error: "Người dùng không hợp lệ" });

  const LC = new LichChieu({
    maRap,
    giaVe,
    maPhim,
    ngayGioKhoiChieu,
    idNguoitao,
  });
  try {
    await LC.save();
    res.status(200).json({
      message: "Thêm lịch chiếu thành công",
      LC: LC,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
const createTicket = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { maGhe, giaVe, idNguoitao, maLichChieu } = req.body;

  let existingUser = await User.findOne({ _id: idNguoitao });
  let existingLC = await LichChieu.findOne({ _id: maLichChieu });
  let existingGhe = await Ticket.findOne({ maGhe: maGhe });
  console.log(existingGhe);
  if (!existingLC) return res.status(400).json({ error: "Phim không tồn tại" });
  if (!existingUser)
    return res.status(400).json({ error: "Người dùng không hợp lệ" });
  if (existingGhe)
    return res.status(400).json({ error: "Ghế Đã có người đặt" });

  const ticket = new Ticket({
    maGhe,
    giaVe,
    idNguoitao,
    maLichChieu,
  });
  try {
    await ticket.save();
    res.status(200).json({
      message: "Đặt vé thành công",
      ticket: ticket,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
const getLCById = async (req, res) => {
  const lCID = req.params.id;
  if (!ObjectId.isValid(lCID))
    return res.status(400).json({ error: "ID không hợp lệ" });

  try {
    const lichChieu = await LichChieu.findById(lCID);
    if (!lichChieu)
      return res.status(404).json("Không có phim nào thuộc ID bạn tìm!");
    res.status(200).json(lichChieu);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createLC,
  createTicket,
  getLCById,
};
