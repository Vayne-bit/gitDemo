// 回复评论
const reply = require("../../service/comment/reply");
const { isEmpty } = require("../../utils/check");

module.exports = async ctx => {
  const {request, response} = ctx;
  try {
    const { commentId, userId, replyUserId, replyContent } = request.body;
    console.log('controller - comment - add - params:', commentId, userId, replyUserId, replyContent);
    if (isEmpty(commentId)) throw '文章Id不能为空';
    if (isEmpty(userId)) throw '评论用户的Id不能为空';
    if (isEmpty(replyUserId)) throw '回复用户的Id不能为空';
    if (isEmpty(replyContent)) throw '回复的内容不能为空'
    response.body = await reply({commentId, userId, replyUserId, replyContent});
  } catch (error) {
    if (typeof error === 'object') error = '未知错误';
    response.body = {
      error_code: 1001,
      error_msg: error
    }
  }
};