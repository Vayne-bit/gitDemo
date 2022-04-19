
const { isEmpty, trimAll } = require("../../utils/check");
const login = require("../../service/user/login");
module.exports = async ctx => {
  // 解构参数
  const { request, response } = ctx;
  let {username, password} = request.body;
  console.log(username, password)
  try {
    if (isEmpty(username)) throw "用户名不能为空";
    if (isEmpty(password)) throw "密码不能为空";
    username = trimAll(username);
    password = trimAll(password);
    // 响应客户端
    response.body = await login({username, password, ctx});
  } catch (error) {
    if (typeof error === 'object') error = '未知错误';
    response.body = {
      error_code: 1001,
      error_msg: error
    };
  }
};