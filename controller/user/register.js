
const { isEmpty, isTel, trimAll } = require("../../utils/check");
const register = require("../../service/user/register");
module.exports = async ctx => {
  // 解构参数
  const { request, response } = ctx;
  let {username, password, tel, code} = request.body;
  console.log(username, password, tel, code)
  try {
    if (isEmpty(username)) throw "用户名不能为空";
    if (isEmpty(password)) throw "密码不能为空";
    if (isEmpty(tel)) throw "手机号码不能为空";
    if (!isTel) throw "手机号码格式不正确";
    username = trimAll(username);
    password = trimAll(password);
    tel = trimAll(tel);
    code = trimAll(code);
    console.log('controller register  tel::', tel, ctx.session);
    const code2 = ctx.session[tel];
    console.log('controller register code2::', code2);
    if (isEmpty(code)) throw "验证码不能为空";
    if (code2 !== code) throw "验证码不正确";
    // 响应客户端
    response.body = await register({username, password, tel, ctx});
  } catch (error) {
    if (typeof error === 'object') error = '未知错误';
    response.body = {
      error_code: 1001,
      error_msg: error
    };
  }
};