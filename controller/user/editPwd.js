
const { isEmpty, trimAll } = require("../../utils/check");
const editPwd = require("../../service/user/editPwd");
module.exports = async ctx => {
  const { request, response } = ctx;
  let { userId, newPwd, oldPwd } = request.body;
  try {
    console.log(userId, newPwd, oldPwd)
    if (isEmpty(userId)) throw "用户名不能为空";
    if (isEmpty(newPwd)) throw "新密码不能为空";
    if (isEmpty(oldPwd)) throw "旧密码不能为空";
    newPwd = trimAll(newPwd);
    oldPwd = trimAll(oldPwd);
    console.log("controller - editPwd - 开始操作数据库");
    response.body = await editPwd({ userId, newPwd, oldPwd });
  } catch (error) {
    if (typeof error === 'object') error = '未知错误';
    response.body = {
      error_code: 1001,
      error_msg: error
    }
  }
};