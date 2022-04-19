
const articleModel = require("../schema/article");
/**
 * 发布文章
 * @param {*} params 
 * @returns 
 */
const create = async params => {
  try {
    return await articleModel.create(params);
  } catch (error) {
    console.log("articleModel---create---error:", error);
    throw "数据库操作错误";
  }
};
/**
 * 更新用户信息
 * @param {*} conditions 
 * @param {*} doc 
 */
const findOneAndUpdate = async (conditions, doc) => {
  return await new Promise(
    (resolve, reject) => {
      articleModel.findOneAndUpdate(conditions, {
        $set: doc
      }, (err, res) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(res);
      });
    }
  ).then(res => res).catch(e => {
    console.log("articleModel-Promise--findOneAndUpdate---error:", error);
    throw "数据库操作错误"
  })
};
/**
 * 根据条件查询
 * @param {*} param0 
 * @returns 
 */
const find = async (conditions, projection = '', query) => {
  console.log('article - model - ', conditions, query);
  return await new Promise(
    (resolve, reject) => {
      // articleModel.find(conditions, projection, query, (err, res) => {
      //   if (err) return reject(err);
      //   resolve(res);
      // });
      articleModel.find(conditions, projection, query).populate('userId', 'nickname').exec(
        (err, res) => {
        if (err) return reject(err);
        resolve(res);
      });
    }
  ).then(res => res).catch(err => {
    console.log('model - article - find - promise:err:', err);
    throw '数据库操作错误';
  });
};

/**
 * 查询当前文档总数量
 * @param {*} conditions 
 * @returns 
 */
const count = async conditions => {
  return await new Promise(
    (resolve, reject) => {
      articleModel.countDocuments(conditions, (err, res) => {
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
 * 删除一条文章
 * @param {*} conditions 
 * @returns 
 */
const findOneAndRemove = async conditions => {
  return await new Promise(
    (resolve, reject) => {
      articleModel.findOneAndRemove(conditions, (err, res) => {
        if (err) return reject(err);
        resolve(res);
      });
    }
  ).then(res => res).catch(err => {
    console.log("model - article - findOneAndRemove - promise - :err", err);
    throw '数据库操作错误';
  });
};

/**
 * 根据文章Id查询文章
 * @param {*} param0 
 * @returns 
 */
const findById = async ({id, projection = null}) => {
  console.log('model -- findById-------', id, projection)
  return await new Promise(
    (resolve, reject) => {
      articleModel.findById(id, projection).populate('userId', 'nickname avatarUrl').exec((err, res) => {
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
      articleModel.findByIdAndUpdate(id, update, (err, res) => {
        if (err) return reject(err);
        resolve(res);
      });
    }
  ).then(res => res).catch(e => {
    throw e;
  });
}
module.exports = {
  create,
  findOneAndUpdate,
  find,
  count,
  findOneAndRemove,
  findById,
  findByIdAndUpdate
};