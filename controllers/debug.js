exp = {};
const { createHash } = require("crypto");
const m_stringlib = require("../models/m_stringlib.js");
const m_idol = require("../models/m_idol.js");
const axios = require("axios");

exp.model_idol = async (req, res) => {
  var id = await m_idol.Idol.genId();
  res.status(200).send("success: " + id);
};

exp.sha256 = async (req, res) => {
  var { hash_str } = req.query;
  if (!hash_str) {
    hash_str = "sha256";
  }
  const hash = createHash("sha256");
  hash.update("" + hash_str);
  fin_hash = hash.digest("hex");
  res.status(200).send("success: " + fin_hash);
};

exp.objeach = async (req, res) => {
  const obj = {
    name: "Jean-Luc Picard",
    rank: "Captain",
  };
  let result = "";
  Object.keys(obj).forEach((key) => {
    result += `${key} : ${obj[key]} -`;
  });
  res.status(200).send("success: " + result);
};

exp.sms = async (req, res) => {
  var token = await m_idol_sms_api.IdolSMSAPI.checkToken();
  data = {
    msisdn: "0804032819",
    message: "ABCDEFGHIJKLMNOPQRSTUVWXYZabc",
    sender: "Demo",
    //scheduled_delivery: data.scheduled_delivery,
    force: "corporate",
    shorten_url: false,
  };
  var smsObj = await axios({
    method: "post",
    url: process.env.IDOL_SMS_HOST + "api/v1/sms",
    headers: { Authorization: "Bearer " + token.token },
    data: data,
  });
  let resData = smsObj.data;
  return res.status(200).json(resData);
};

module.exports = exp;
