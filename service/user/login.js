
const jwt = require('jsonwebtoken');
const { findOne } = require("../../model/user");
module.exports = async ({username, password, ctx}) => {
  try {
    const res = await findOne({username});
    console.log('service---login-findOne:', res);
    if (!res || res.password !== password) throw '账号或密码错误';
    const { _id } = res;
    // token 有效期1h
    const token = jwt.sign({ username, password}, 'shhhhh', { expiresIn: 60 * 60 });
    // 将token保存在session中
    ctx.session.token = token;
    return {
      error_code: 0,
      error_msg: '请求成功',
      data: {
        token,
        userId: _id
      }
    }
  } catch (error) {
    throw error;
  }

};