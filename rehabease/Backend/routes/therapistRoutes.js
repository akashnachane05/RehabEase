const express = require("express");
const { registerTherapist, loginTherapist } = require("../controllers/authController");
const router = express.Router();

router.post("/register", registerTherapist);
router.post("/login", loginTherapist);

module.exports = router;
