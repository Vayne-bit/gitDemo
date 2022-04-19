
const { findOneAndRemove } = require("../../model/article");

module.exports = async ({userId, articleId}) => {
  try {
    console.log("service - article - deleteOne - params:", userId, articleId);
    const res = await findOneAndRemove({userId, _id: articleId});
    console.log("service - article - deleteOne - res:", res);
    if (!res) throw '删除失败';
    return {
      error_code: 0,
      error_msg: '请求成功'
    };
  } catch (error) {
    throw error;
  }
};