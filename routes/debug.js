const express = require("express");
const router = express.Router();
//const authorize = require("../middleware/auth.js");
const debug = require("../controllers/debug.js");
//router.use("/auth", authorize);

router.get("/idol", debug.model_idol);
router.get("/sha256", debug.sha256);
router.get("/sms", debug.sms);

module.exports = router;
