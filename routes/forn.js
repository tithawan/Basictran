const express = require("express");
const router = express.Router();
//const authorize = require("../middleware/auth.js");
const fron = require("../controllers/fornend.js");
//router.use("/auth", authorize);

router.get("/", fron.home);

module.exports = router;
