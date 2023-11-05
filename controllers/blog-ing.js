const path = require("path");
const jwt = require("jsonwebtoken");
const session = require("express-session");

const m_stringlib = require("../models/m_stringlib.js");
//const { data } = require("jquery");

var exp = {};
exp.blog = (req, res) => {
  return res.render(path.resolve("views", "blog-ing"), { name: "Tobi" });
  
};

exp.listName = (req, res) => {
    return res.render(path.resolve("views", "listname"), { name: "Tobi" });
    
};

exp.sumNumber = (req, res) => {
    let data=req.body
    data1 = parseInt(data.dataname)
    data2 = parseInt(data.datalastname)
    let sum = data1 + data2
    console.log(data)
    return res.status(200).json({data:sum})
  };

  exp.listName1 = (req, res) => {
    let data=req.body
    
    
    console.log(data)
    return res.status(200).json(data)
  };

  

module.exports = exp;
