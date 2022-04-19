
const { isEmpty } = require("../../utils/check");
const deleteOne = require("../../service/article/deleteOne");
module.exports = async ctx => {
  const {request, response} = ctx;
  try {
    const {userId, articleId} = request.body;
    console.log("controller - article - deleteOne - params:", userId, articleId);
    if (isEmpty(userId)) throw '用户id不能为空';
    if (isEmpty(articleId)) throw '文章id不能为空';
    response.body = await deleteOne({userId, articleId});
  } catch (error) {
    if (typeof error === 'object') error = '未知错误';
    response.body = {
      error_code: 1001,
      error_msg: error
    };
  }
};