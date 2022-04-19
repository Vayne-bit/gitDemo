
const { create } = require("../../model/comment");
const { findById } = require("../../model/article");
module.exports = async ({articleId, userId, content, child = {}}) => {
  try {
    console.log('service - comment - add - params:', articleId, userId, content, child);
    // 查询该文章是否存在 如果id不存，则会抛出错误
    const artRes = await findById({id: articleId});
    console.log('service - comment - article - findById - artRes:', artRes);
    if (!artRes) throw '该文章不存在';
    // 添加评论
    const res = await create({articleId, userId, content, child});
    console.log('service - comment - add - res:', res);
    if (!res) throw '数据库操作错误';
    return {
      error_code: 0,
      error_msg: '请求成功'
    };
  } catch (error) {
    throw error;
  }
};