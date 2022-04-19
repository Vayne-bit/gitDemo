const { isEmpty } = require("../../utils/check");
const getDetails = require("../../service/article/getDetails");
module.exports = async ctx => {
  const {request, response} = ctx;
  try {
    let { articleId, userId } = request.body;
    console.log("controller - article - getDetails - params:", articleId, userId);
    if (isEmpty(articleId)) throw '文章Id不能为空';
    // if (isEmpty(userId)) throw '用户Id不能为空';
    response.body = await getDetails({ id: articleId, userId });
  } catch (error) {
    console.log('error;;;', error)
    if (typeof error === 'object') error = '未知错误';
    response.body = {
      error_code: 1001,
      error_msg: error
    };
  }  
};