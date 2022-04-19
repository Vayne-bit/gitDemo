
const { isEmpty } = require("../../utils/check");
const keep = require("../../service/article/keep");
module.exports = async ({ request, response }) => {
  try {
    const { userId, articleId } = request.body;
    console.log('controller - article - keep - params:', userId);
    if (isEmpty(userId)) throw '用户id不能为空';
    if (isEmpty(articleId)) throw '文章id不能为空';
    response.body = await keep({ userId, articleId })
  } catch (error) {
    if (typeof error === 'object') error = '未知错误';
    response.body = {
      error_code: 1001,
      error_msg: error
    }
  }
};