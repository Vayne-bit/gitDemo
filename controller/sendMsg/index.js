const { isEmpty, isTel } = require("../../utils/check");
const sendMsg = require("../../service/sendMsg");
// 模拟发送短信验证码
module.exports = async ctx => {
  const { request, response } = ctx;
  const { tel } = request.body;
  try {
    if (isEmpty(tel)) throw "手机号码不能为空";
    if (!isTel(tel)) throw "手机号码格式不正确";
    response.body = await sendMsg({tel, ctx});
  } catch (error) {
    if (typeof error === 'object') error = '未知错误';
    response.body = {
      error_code: 1001,
      error_msg: error
    }
  }
};