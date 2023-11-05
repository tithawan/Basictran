const path = require("path");
const jwt = require("jsonwebtoken");
const session = require("express-session");

const m_stringlib = require("../models/m_stringlib.js");

var exp = {};
exp.home = (req, res) => {
  res.render(path.resolve("views", "home"), { name: "Tobi" });
};

module.exports = exp;
