
const getLikeStatus = require("./getKeepAndLikeStatus");
const { findByIdAndUpdate } = require("../../model/article");
module.exports = async ({userId, articleId}) => {
  try {
    console.log("service - article - keep - params:", userId, articleId);
    let {
      keepStatus,
      keepUserId
    } = await getLikeStatus({
      userId, articleId
    });
    console.log('service - article - keep - keepStatus:', keepStatus, keepUserId);
    // 取消收藏
    if (keepStatus) keepUserId = keepUserId.filter(item => item != userId);
    else keepUserId.push(userId);
    console.log("keepUserId:", keepUserId.length);
    const res = await findByIdAndUpdate({
      id: articleId,
      update: {
        keepUserId,
        keep: keepUserId.length
      }
    });
    console.log('service - article - keep - res:', res);
    if (res) return {
      error_code: 0,
      error_msg: '请求成功'
    };
    else throw '数据库操作错误';
  } catch (error) {
    throw error
  }
};