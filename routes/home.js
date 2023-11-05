const express = require("express");
const router = express.Router();
//const authorize = require("../middleware/auth.js");
const home = require("../controllers/home.js");
//router.use("/auth", authorize);

router.get("/", home.home);

module.exports = router;
