const express = require("express");
const router = express.Router();
//const authorize = require("../middleware/auth.js");
const blog = require("../controllers/blog-ing.js");
//router.use("/auth", authorize);

router.get("/", blog.blog);
router.post("/sumnumber", blog.sumNumber);
router.get("/listname", blog.listName);
router.post("/listname1", blog.listName1);
router.get("/treecis", blog.treecis);
router.post("/layertree", blog.layerTree);
router.get("/cal", blog.calcuLine);
router.post("/calnum", blog.calNumber);
router.post("/calline", blog.calLine);
router.get("/calstack", blog.calStackLine);
router.post("/calline2", blog.calLine2);
router.get("/new", blog.new);
router.get("/csslearn", blog.csslearn);

module.exports = router;
