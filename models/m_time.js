const { createHash } = require("crypto");
const m_stringlib = require("./m_stringlib.js");
exp = {};
exp.dateToUnix = (data) => {
  let datarr = data.split("/");
  let cur_time = new Date(exp.toInt(datarr[2]), exp.toInt(datarr[1])-1, exp.toInt(datarr[0]), 0, 0, 1, 0);
  let cur_time_unix = cur_time.getTime() / 1000;
  return cur_time_unix;
};
exp.unixToDate = (data) => {
  let dat = exp.toInt(data) * 1000;
  let cur_time = new Date(dat);
  let cur_time_str = cur_time.getDate() + "/" + (cur_time.getMonth()+1) + "/" + cur_time.getFullYear();
  return cur_time_str;
};
exp.unixToDatetime = (data) => {
  let dat = exp.toInt(data) * 1000;
  let cur_time = new Date(dat);
  let cur_time_str = cur_time.getDate() + "/" + (cur_time.getMonth()+1) + "/" + cur_time.getFullYear() + " " + cur_time.getHours() + ":" + cur_time.getMinutes();
  return cur_time_str;
};
exp.curUnixTime = () => {
  var mark_time = new Date();
  var cur_time = Math.floor(mark_time.getTime() / 1000);
  return cur_time;
};
exp.toInt = (dat) => {
  let result = parseInt(dat);
  if (isNaN(result)) {
    result = 0;
  }
  return result;
};
exp.toFloat = (dat) => {
  let result = parseFloat(dat);
  if (isNaN(result)) {
    result = 0;
  }
  return result;
};

// debug region
//console.log(exp.uniqueAlphaNum20());
module.exports = exp;
