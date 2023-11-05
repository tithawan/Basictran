const { Model } = require("objection");
const Knex = require("knex");
const dbConfig = require("./config.js");
const m_stringlib = require("./m_stringlib.js");
const { createHash } = require("crypto");

// Initialize knex.
const knex = Knex(dbConfig);

// Give the knex instance to objection.
Model.knex(knex);

// Person model.
class Idol extends Model {
  static get tableName() {
    return "idol";
  }
  static get idColumn() {
    return "id";
  }

  fullName() {
    return this.firstName + " " + this.lastname;
  }

  static async genId() {
    let isuniq = false;
    let id = "";
    do {
      let temp_id = m_stringlib.uniqueAlphaNum20();
      let query = await this.query().findById(temp_id);
      if (!query) {
        id = temp_id;
        isuniq = true;
      }
    } while (!isuniq);

    //return $clam_id;
    //this.knex().destroy();
    return id;
  }
  static async login(username, password) {
    const hash = createHash("sha256");
    hash.update("" + password);
    let fin_hash = hash.digest("hex");
    let query = await this.query().where("username", username).where("password", fin_hash);
    if (query.length == 1) {
      return query[0];
    } else {
      return false;
    }
  }
  static async getById(id) {
    let query = await this.query().where("id", id);
    //console.log(query);
    if (query.length == 1) {
      return query[0];
    } else {
      return false;
    }
  }
  static async getAll(filter, limit = 0, offset = 0, order_col = "id", order_by = "asc") {
    let query = this.query();
    if (limit != 0) {
      query.limit(limit).offset(offset);
    }
    Object.keys(filter).forEach((key) => {
      query.where(key, filter[key]);
    });
    query.orderBy(order_col, order_by);
    let result = await query;
    //console.log(query);
    if (result.length > 0) {
      for (let index = 0; index < result.length; index++) {
        var idol_img = await m_idol_img.Idol_img.getList(result[index].id);
        result[index].img = idol_img;
      }
      for (let index = 0; index < result.length; index++) {
        var idol_pack = await m_package.Package.getList(result[index].id);
        result[index].package = idol_pack;
      }
      return result;
    } else {
      return false;
    }
  }
  static async searchAll(filter, filter_or, tag, limit = 0, offset = 0, order_col = "id", order_by = "asc") {
    let query = this.query();
    if (limit != 0) {
      query.limit(limit).offset(offset);
    }
    Object.keys(filter).forEach((key) => {
      query.where(key, filter[key]);
    });
    if (Object.keys(filter_or).length > 0) {
      let querySty_or = "(";
      let filter_or_arr = [];
      Object.keys(filter_or).forEach((key) => {
        //query.orWhere(key, "like", "%" + filter_or[key] + "%");
        filter_or_arr.push("%" + filter_or[key] + "%");
        querySty_or += "`" + key + "` like ? or";
      });
      querySty_or = querySty_or.substring(0, querySty_or.length - 2) + ")";
      query.whereRaw(querySty_or, filter_or_arr);
    }
    if (tag != "") {
      let text = tag;
      let result = text.substring(0, text.length - 1);
      let myArray = result.split(",");
      let queryStr_tag = "(";
      myArray.forEach((item, index) => {
        myArray[index] = "%" + item + "%";
        queryStr_tag += "`tag` like ? or";
        //query.orWhere("tag", "like", "%" + item + "%");
      });
      queryStr_tag = queryStr_tag.substring(0, queryStr_tag.length - 2) + ")";
      query.whereRaw(queryStr_tag, myArray);
    }
    query.orderBy(order_col, order_by);
    query.leftJoin("package", "idol.id", "=", "package.idol_id").select("idol.*", "package.tag").groupBy("idol.id");
    //console.log(query.toKnexQuery().toSQL().toNative());
    let result = await query;
    if (result.length > 0) {
      for (let index = 0; index < result.length; index++) {
        var idol_img = await m_idol_img.Idol_img.getList(result[index].id);
        result[index].img = idol_img;
      }
      for (let index = 0; index < result.length; index++) {
        var idol_pack = await m_package.Package.getList(result[index].id, { tag: tag });
        result[index].package = idol_pack;
      }
      return result;
    } else {
      return false;
    }
  }
  static async register(data) {
    const hash = createHash("sha256");
    hash.update("" + data.password);
    let fin_hash = hash.digest("hex");
    let id = await this.genId();
    //console.log(data);
    let cur_time = new Date();
    let query = await this.query().insert({
      id: id,
      firstname: data.firstname,
      lastname: data.lastname,
      username: data.username,
      password: fin_hash,
      line_id: data.line_id,
      tel: data.tel,
      register_time: cur_time.toString(),
    });
    if (query instanceof Idol) {
      return query;
    } else {
      return false;
    }
  }

  static async updateById(id, data) {
    let numUpdated = await this.query().patch(data).where("id", "=", id);
    if (numUpdated == 1) {
      return true;
    } else {
      return false;
    }
  }
  static async checkDupUsername(usn) {
    let query = await this.query().where("username", usn);
    //console.log(query);
    if (query.length == 1) {
      return true;
    } else {
      return false;
    }
  }
}
module.exports = { Idol };
