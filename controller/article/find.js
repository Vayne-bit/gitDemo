const { isEmpty } = require("../../utils/check");
const find = require("../../service/article/find");
module.exports = async ctx => {
  const {request, response} = ctx;
  let { pageNum = 1, pageSize = 10, type, userId} = request.body;
  console.log("controller - article - find - params:", pageSize, pageSize, type, userId);
  try {
    if (isEmpty(type)) throw '文章类型不能为空';
    pageNum = pageNum <= 0 ? 1 : parseInt(pageNum, 10);
    pageSize = pageSize <= 0 ? 10 : parseInt(pageSize, 10); 
    response.body = await find({pageNum, pageSize, type, userId});
  } catch (error) {
    if (typeof error === 'object') error = '未知错误';
    response.body = {
      error_code: 1001,
      error_msg: '数据库操作错误'
    };
  }  
};