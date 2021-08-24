const auth = require("../Authentication/auth");
const test = require("../middleware/Role");
const express = require("express");
const router = express.Router();
const { checkBooking } = require("../Validation/bookingValidator");
const {
  createLC,
  createTicket,
  getLCById,
} = require("../controllers/bookingController");

router.post("/TaoLichChieu", auth, test, checkBooking, createLC);
router.post("/datve", auth, createTicket);
router.get("/GetLichChieu/:id", getLCById);

module.exports = router;
