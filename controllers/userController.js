const { validationResult } = require("express-validator");
const User = require("../models/UserModel");
const Ticket = require("../models/ticketModel");
const ObjectId = require("mongoose").Types.ObjectId;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return res.status(400).json(errors);

  const { taiKhoan, password, email, phone, hoTen } = req.body;
  let checkUser = await User.findOne({ email: email });
  if (checkUser) return res.status(400).json("Email đã có người đăng kí");

  let existingAccount = await User.findOne({ taiKhoan: taiKhoan });
  if (existingAccount)
    return res.status(400).json("Tài khoản đã có người đăng kí");

  let hashedPassword = await bcrypt.hash(password, 12);

  const createdUser = new User({
    taiKhoan,
    password: hashedPassword,
    email,
    phone,
    hoTen,
  });

  try {
    await createdUser.save();
  } catch (err) {}

  let token;
  token = jwt.sign(
    { id: createdUser.id, email: createdUser.email },
    "supersecretkey",
    { expiresIn: "2h" }
  );
  res.status(201).json({ token: token, id: createdUser.id });
};

const createUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return res.status(400).json("check your data");
  const { taiKhoan, password, email, phone, maNhom, type, hoTen, creator } =
    req.body;

  let checkUser = await User.findOne({ email: email });
  if (checkUser) return res.status(400).json("Email đã tồn tại");

  let existingAccount = await User.findOne({ taiKhoan: taiKhoan });
  if (existingAccount) return res.status(400).json("Tài khoản đã tồn tại");

  let hashedPassword = await bcrypt.hash(password, 12);

  const createdUser = new User({
    taiKhoan,
    password: hashedPassword,
    email,
    phone,
    maNhom,
    type,
    hoTen,
    creator,
  });
  try {
    await createdUser.save();
  } catch (err) {}

  res.status(201).json({ user: createdUser });
};
// 2) Đăng nhập tài khoản
const login = async (req, res) => {
  const { email, password } = req.body;
  let checkUser;

  try {
    checkUser = await User.findOne({ email: email });
  } catch (err) {}

  if (!checkUser) return res.status(200).json("Sai thông tin đăng nhập!");

  let isValidPassword = await bcrypt.compare(password, checkUser.password);

  if (!isValidPassword)
    return res.status(400).json("Mật khẩu sai, không thể đăng nhập");

  const token = jwt.sign(
    { id: checkUser.id, email: checkUser.email },
    "supersecretkey",
    { expiresIn: "2h" }
  );
  const tickets = await Ticket.find({ creator: checkUser.id });
  res.status(200).json({
    id: checkUser.id,
    token: token,
    data: checkUser,
    thongTinDatve: tickets,
  });
};
const getListUser = async (req, res) => {
  try {
    const user = await User.find();
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: "server error" });
  }
};
const getUserType = async (req, res) => {
  let type = req.params.type;
  try {
    const users = await User.find({
      type: type,
    });
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ message: "server error" });
  }
};

// Search user
const searchUser = async (req, res) => {
  const tuKhoa = req.params.tuKhoa;
  try {
    const users = await User.find(
      {
        $or: [
          { hoTen: new RegExp(tuKhoa) },
          { taiKhoan: new RegExp(tuKhoa) },
          { type: new RegExp(tuKhoa) },
          { maNhom: new RegExp(tuKhoa) },
          { phone: new RegExp(tuKhoa) },
          { email: new RegExp(tuKhoa) },
        ],
      },
      { password: 0 }
    );
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ message: "Không tìm thấy" });
  }
};
// Search page user
const searchPagaUser = async (req, res) => {
  const tuKhoa = req.params.tuKhoa;
  const page = req.params.page || 1;
  const { perPage } = req.body || 20;
  try {
    const users = await User.find(
      {
        $or: [
          { hoTen: new RegExp(tuKhoa) },
          { taiKhoan: new RegExp(tuKhoa) },
          { type: new RegExp(tuKhoa) },
          { maNhom: new RegExp(tuKhoa) },
          { phone: new RegExp(tuKhoa) },
          { email: new RegExp(tuKhoa) },
        ],
      },
      { password: 0 }
    )
      .skip(perPage * page - perPage)
      .limit(perPage);
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ message: "Không tìm thấy" });
  }
};
const paginationUser = async (req, res) => {
  const page = req.params.page || 1;
  const { perPage } = req.body || 20;
  try {
    const users = await User.find()
      .skip(perPage * page - perPage)
      .limit(perPage);
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ message: "server error" });
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id))
    return res.status(400).json({ error: "ID không tồn tại" });

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "ID không tồn tại" });

    await user.remove();
    res.status(200).json({ message: "Xóa thành công" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Server error" });
  }
};
// Thông tin tài khoản
const getUserByID = async (req, res) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id))
    return res.status(400).json({ error: "ID không hợp lệ" });

  try {
    const user = await User.findById(id);
    const tickets = await Ticket.find({ creator: id });
    if (!user)
      return res.status(404).json("Không có tài khoản nào thuộc ID bạn tìm!");
    console.log(user.password);
    res.status(200).json({
      data: user,
      thongTinDatve: tickets,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Update tài khoản
const updateUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  const { maNhom, type, phone, hoTen, password } = req.body;
  let hashedPassword = await bcrypt.hash(password, 12);
  const id = req.params.id;

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "user not found." });

    const update = await user.updateOne(
      {
        maNhom,
        type,
        phone,
        hoTen,
        password: hashedPassword,
      },
      {
        timestamps: { createdAt: false, updatedAt: true },
      }
    );

    try {
      await update.save();
    } catch (err) {}

    return res.status(200).json(update);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "server error" });
  }
};

module.exports = {
  register,
  login,
  getListUser,
  getUserType,
  paginationUser,
  searchUser,
  updateUser,
  searchPagaUser,
  deleteUser,
  getUserByID,
  createUser,
};
