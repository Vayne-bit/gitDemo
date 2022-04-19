const userModel = require("../schema/user");

/**
 * 新增一条数据
 * @param {*} params 
 * @returns 
 */
const create = async params => {
  try {
    return await userModel.create(params);
  } catch (error) {
    console.log("userModel---create---error:", error);
    throw "数据库操作错误";
  }
}
/**
 * 根据条件查找一个
 * @param {*} conditions 
 * @returns 
 */
const findOne = async (conditions, projection) => {
  return await new Promise(
    (resolve, reject) => {
      // console.log("conditions:", conditions);
      userModel.findOne(conditions, projection, (err, res) => {
        // console.log("res:", res)
        if (err) return reject(err);
        resolve(res);
      });
    }
  ).then(res => res).catch(e => {
    console.log("userModel-Promise--findOne---error:", error);
    throw "数据库操作错误"
  });
}

/**
 * 更新用户信息
 * @param {*} conditions 
 * @param {*} doc 
 */
const findOneAndUpdate = async (conditions, doc) => {
  return await new Promise(
    (resolve, reject) => {
      userModel.findOneAndUpdate(conditions, {
        $set: doc
      }, (err, res) => {
        if (err) return reject(err);
        resolve(res);
      });
    }
  ).then(res => res).catch(e => {
    console.log("userModel-Promise--findOneAndUpdate---error:", error);
    throw "数据库操作错误"
  });
};
// 对外暴露接口
module.exports = {
  create,
  findOne,
  findOneAndUpdate
};