
const commentModel = require("../schema/comment");
/**
 * 发布评论
 * @param {*} params 
 * @returns 
 */
 const create = async params => {
  try {
    return await commentModel.create(params);
  } catch (error) {
    console.log("commentModel---create---error:", error);
    throw "数据库操作错误";
  }
};
/**
 * 根据文章Id查询评论
 * @param {*} param0 
 * @returns 
 */
 const find = async (conditions, projection = '', query) => {
  console.log('find-------', conditions, projection)
  return await new Promise(
    (resolve, reject) => {
      commentModel.find(conditions, projection, query).populate('userId', 'nickname avatarUrl').exec(
        (err, res) => {
        if (err) return reject(err);
        resolve(res);
      });
    }
  ).then(res => res).catch(e => {
    throw e;
  });
};

const findByIdAndUpdate = async ({id, update}) => {
  console.log('findByIdAndUpdate-------', id, update)
  return await new Promise(
    (resolve, reject) => {
      commentModel.findByIdAndUpdate(id, update, (err, res) => {
        if (err) return reject(err);
        resolve(res);
      });
    }
  ).then(res => res).catch(e => {
    throw e;
  });
}
/**
 * 查询当前评论总数量
 * @param {*} conditions 
 * @returns 
 */
 const countDocuments = async conditions => {
  return await new Promise(
    (resolve, reject) => {
      commentModel.countDocuments(conditions, (err, res) => {
        if (err) return reject(err);
        resolve(res);
      });
    }
  ).then(res => res).catch(err => {
    console.log("model - article - count - promise - :err", err);
    throw '数据库操作错误';
  });
}

/**
 * 根据评论Id查询文章
 * @param {*} param0 
 * @returns 
 */
 const findById = async ({id, projection = null}) => {
  console.log('model -- findById-------', id, projection)
  return await new Promise(
    (resolve, reject) => {
      commentModel.findById(id, projection).exec((err, res) => {
        if (err) return reject(err);
        resolve(res);
      });
    }
  ).then(res => res).catch(e => {
    throw e;
  });
};
module.exports = {
  create,
  find,
  findByIdAndUpdate,
  countDocuments,
  findById
};