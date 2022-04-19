const { isEmpty } = require("../../utils/check");
const getListByArtId = require("../../service/comment/getListByArtId");
module.exports = async ({ request, response }) => {
  try {
    const { pageNum = 1, pageSize = 10, articleId } = request.body;
    console.log("controller - comment - getListByArtId - params:", articleId, pageNum, pageSize);
    if (isEmpty(articleId)) throw '文章id不能为空';
    response.body = await getListByArtId({ articleId, pageNum, pageSize })
  } catch (error) {
    console.log('未知错误::', error);
    if (typeof error === 'object') error = '未知错误';
    response.body = {
      error_code: 1001,
      error_msg: error
    };
  }
};