const getLikeStatus = require("./getKeepAndLikeStatus");
const { findByIdAndUpdate } = require("../../model/article");
module.exports = async ({ userId, articleId }) => {
  try {
    console.log('service - article - like - params:', userId, articleId);
    let {
      likeStatus,
      likeUserId
    } = await getLikeStatus({
      userId, articleId
    });
    console.log('service - article - like - likeStatus:', likeStatus);
    // 取消点赞
    if (likeStatus) likeUserId = likeUserId.filter(item => item != userId);
    else likeUserId.push(userId);
    console.log("likeUserId:", likeUserId.length);
    const res = await findByIdAndUpdate({
      id: articleId,
      update: {
        likeUserId,
        like: likeUserId.length
      }
    });
    console.log('service - article - like - res:', res);
    if (res) return {
      error_code: 0,
      error_msg: '请求成功'
    };
    else throw '数据库操作错误';
    // true表示已点赞； false表示未点赞
    // 判断该用户是否已点赞如果已点赞则取消点赞，否则点赞
  } catch (error) {
    throw error
  }
};