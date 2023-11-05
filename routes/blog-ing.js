const express = require("express");
const router = express.Router();
//const authorize = require("../middleware/auth.js");
const blog = require("../controllers/blog-ing.js");
//router.use("/auth", authorize);

router.get("/", blog.blog);
router.post("/sumnumber", blog.sumNumber);
router.get("/listname", blog.listName);
router.post("/listname1", blog.listName1);

module.exports = router;
