
const { isEmpty, trimAll } = require("../../utils/check");
const find = require("../../service/user/getUserInfo");
module.exports = async ctx => {
  // 解构参数
  const { request, response } = ctx;
  let {userId} = request.body;
  console.log(userId)
  try {
    if (isEmpty(userId)) throw "用户id不能为空";
    // 响应客户端
    response.body = await find({userId});
  } catch (error) {
    if (typeof error === 'object') error = '未知错误';
    response.body = {
      error_code: 1001,
      error_msg: error
    };
  }
};