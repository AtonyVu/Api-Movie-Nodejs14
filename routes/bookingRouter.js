const auth = require("../Authentication/auth");
const test = require("../middleware/Role");
const express = require("express");
const router = express.Router();
const LCController = require("../controllers/bookingController");

router.post("/lcmovie", auth, test, LCController.createLC);
router.post("/datve", auth, test, LCController.createTicket);
router.get("/lcmovie/:id", LCController.getLCById);

module.exports = router;
