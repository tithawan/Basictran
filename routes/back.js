const express = require("express");
const router = express.Router();
//const authorize = require("../middleware/auth.js");
const back = require("../controllers/backend.js");
//router.use("/auth", authorize);

router.get("/", back.home);

module.exports = router;
