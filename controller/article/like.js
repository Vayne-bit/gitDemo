
const { isEmpty } = require("../../utils/check");
const like = require("../../service/article/like");
module.exports = async ({ request, response }) => {
  try {
    const { userId, articleId } = request.body;
    console.log('controller - article - like - params:', userId);
    if (isEmpty(userId)) throw '用户id不能为空';
    if (isEmpty(articleId)) throw '文章id不能为空';
    response.body = await like({ userId, articleId });
  } catch (error) {
    console.log('error:', error);
    error = typeof error === 'object' ? '未知错误' : error;
    response.body = {
      error_code: 1001,
      error_msg: error
    }
  }
};