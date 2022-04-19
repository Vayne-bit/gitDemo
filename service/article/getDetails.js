const { findById } = require("../../model/article");
const getLikeStatus = require("./getKeepAndLikeStatus");
module.exports = async ({ id, userId }) => {
  try {
    console.log('service - article - getDetails - params:', id);
    const res = await findById({ id, projection: 'createTime like keep _id userId title type content' });
    console.log('service - article - getDetails - res:', res);
    // copy对象
    let result = JSON.stringify(res);
    result = JSON.parse(result);
    // console.log(result === res)
    // 是否已点赞
    if (userId) {
      const {
        likeStatus,
        keepStatus
      } = await getLikeStatus({articleId: id, userId});
      console.log("likeStatus - keepStatus", likeStatus, keepStatus);
      result.likeStatus = likeStatus;
      result.keepStatus = keepStatus;
    } else {
      // 如果用户没有登录，则默认没有点赞与收藏
      result.likeStatus = false;
      result.keepStatus = false;
    }
    console.log("result-------------------------------------------------------", result);
    return {
      error_code: 0,
      error_msg: '请求成功',
      data: result
    };
    // 是否已收藏
  } catch (error) {
    throw error;
  }
};