const { isEmpty, isTel, trimAll } = require("../../utils/check");
const forgotPwd = require("../../service/user/forgotPwd");
/**
 * 忘记密码：
 *  传递参数：手机号码
 * @param {*} ctx 
 */
module.exports = async ctx => {
  const { request, response } = ctx;
  let { tel, username, newPwd, code } = request.body;
  const code2 = ctx.session[tel];
  console.log("controller - forgotPwd - params:", tel, username, newPwd, code);
  try {
    if (isEmpty(tel)) throw "手机号码不能为空";
    if (!isTel(tel)) throw "手机号码格式不正确";
    if (isEmpty(username)) throw "用户名不能为空";
    if (isEmpty(newPwd)) throw "密码不能为空";
    if (isEmpty(code)) throw "手机验证码不能为空";
    if (code2 !== code) throw "手机验证码不正确";
    username = trimAll(username);
    newPwd = trimAll(newPwd);
    tel = trimAll(tel);
    code = trimAll(code);
    response.body = await forgotPwd({ tel, username, newPwd });
  } catch (error) {
    if (typeof error === 'object') error = '未知错误';
    response.body = {
      error_code: 1001,
      error_msg: error
    };
  }
};