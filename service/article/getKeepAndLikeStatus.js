const { findById } = require("../../model/article");
module.exports = async ({ userId, articleId }) => {
  try {
    console.log('service - article - getKeepAndLikeStatus - params:', userId, articleId);
    const res = await findById({
      id: articleId, 
      projection: 'likeUserId keepUserId'
    });
    console.log('service - article - getKeepAndLikeStatus - res:', res);
    const { likeUserId, keepUserId } = res;
    // 是否点赞
    let likeStatus = false;
    // 是否收藏
    let keepStatus = false;
    if (likeUserId.includes(userId)) likeStatus = true;
    if (keepUserId.includes(userId)) keepStatus = true;
    return {
      likeStatus,
      keepStatus,
      likeUserId, 
      keepUserId
    }
    // 判断该用户是否已点赞如果已点赞则取消点赞，否则点赞
  } catch (error) {
    throw error
  }
};