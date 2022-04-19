// 评论
const add = require("../../service/comment/add");
const { isEmpty } = require("../../utils/check");

module.exports = async ctx => {
  const {request, response} = ctx;
  try {
    const { articleId, userId, content } = request.body;
    console.log('controller - comment - add - params:', articleId, userId, content);
    if (isEmpty(articleId)) throw '文章Id不能为空';
    if (isEmpty(userId)) throw '用户Id不能为空';
    if (isEmpty(content)) throw '评论内容不能为空';
    response.body = await add({articleId, userId, content});
  } catch (error) {
    if (typeof error === 'object') error = '未知错误';
    response.body = {
      error_code: 1001,
      error_msg: error
    }
  }
};